package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"pasti-pintar-backend/config"
	"pasti-pintar-backend/database"
	"pasti-pintar-backend/models"
	"pasti-pintar-backend/utils"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

// Google OAuth configuration
var googleOAuthConfig *oauth2.Config

// Initialize OAuth config (called from main.go or init)
func init() {

}

// getGoogleOAuthConfig
func getGoogleOAuthConfig() *oauth2.Config {
	return &oauth2.Config{
		ClientID:     config.AppConfig.GoogleClientID,
		ClientSecret: config.AppConfig.GoogleClientSecret,
		RedirectURL:  config.AppConfig.GoogleRedirectURL,
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
		},
		Endpoint: google.Endpoint,
	}
}

type GoogleUserInfo struct {
	ID            string `json:"id"`
	Email         string `json:"email"`
	VerifiedEmail bool   `json:"verified_email"`
	Name          string `json:"name"`
	GivenName     string `json:"given_name"`
	FamilyName    string `json:"family_name"`
	Picture       string `json:"picture"`
}

// Start Google OAuth flow
func GoogleLogin(w http.ResponseWriter, r *http.Request) {
	// Check if Google OAuth is configured
	if config.AppConfig.GoogleClientID == "" {
		sendError(w, http.StatusServiceUnavailable, "oauth_not_configured", "Google OAuth belum dikonfigurasi")
		return
	}

	oauthConfig := getGoogleOAuthConfig()
	state := "random-state-string"
	url := oauthConfig.AuthCodeURL(state, oauth2.AccessTypeOffline)

	// Redirect user to Google
	log.Printf("Redirecting to Google OAuth: %s", url)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

// Handle Google OAuth callback
func GoogleCallback(w http.ResponseWriter, r *http.Request) {
	//Get authorization code from URL
	code := r.URL.Query().Get("code")
	if code == "" {
		log.Printf("No code in callback")
		http.Redirect(w, r, config.AppConfig.FrontendURL+"/login?error=oauth_failed", http.StatusTemporaryRedirect)
		return
	}

	// Exchange code for access token
	oauthConfig := getGoogleOAuthConfig()
	token, err := oauthConfig.Exchange(context.Background(), code)
	if err != nil {
		log.Printf("Failed to exchange code: %v", err)
		http.Redirect(w, r, config.AppConfig.FrontendURL+"/login?error=oauth_failed", http.StatusTemporaryRedirect)
		return
	}

	//Get user info from Google
	userInfo, err := getGoogleUserInfo(token.AccessToken)
	if err != nil {
		log.Printf("Failed to get user info: %v", err)
		http.Redirect(w, r, config.AppConfig.FrontendURL+"/login?error=oauth_failed", http.StatusTemporaryRedirect)
		return
	}

	log.Printf("Google user info: %s (%s)", userInfo.Name, userInfo.Email)

	//Find or create user in our database
	user, err := findOrCreateGoogleUser(userInfo)
	if err != nil {
		log.Printf("Failed to create user: %v", err)
		http.Redirect(w, r, config.AppConfig.FrontendURL+"/login?error=oauth_failed", http.StatusTemporaryRedirect)
		return
	}

	//Generate our JWT token
	jwtToken, err := utils.GenerateToken(user.ID, user.Email)
	if err != nil {
		log.Printf("Failed to generate token: %v", err)
		http.Redirect(w, r, config.AppConfig.FrontendURL+"/login?error=oauth_failed", http.StatusTemporaryRedirect)
		return
	}

	//Redirect to frontend with token
	redirectURL := fmt.Sprintf("%s/auth/callback?token=%s", config.AppConfig.FrontendURL, jwtToken)
	log.Printf("Google OAuth successful for: %s", user.Email)
	http.Redirect(w, r, redirectURL, http.StatusTemporaryRedirect)
}

func getGoogleUserInfo(accessToken string) (*GoogleUserInfo, error) {
	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + accessToken)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var userInfo GoogleUserInfo
	if err := json.Unmarshal(body, &userInfo); err != nil {
		return nil, err
	}

	return &userInfo, nil
}

// Find existing user or create new one from Google info
func findOrCreateGoogleUser(googleUser *GoogleUserInfo) (*models.User, error) {
	//try to find by Google provider ID
	user, err := database.GetUserByProviderID("google", googleUser.ID)
	if err == nil {
		user.FullName = googleUser.Name
		user.AvatarURL = googleUser.Picture
		user.EmailVerified = googleUser.VerifiedEmail
		database.UpdateUser(user)
		return user, nil
	}

	// Check if email already exists (user might have signed up with email first)
	user, err = database.GetUserByEmail(googleUser.Email)
	if err == nil {
		user.Provider = "google"
		user.ProviderID = googleUser.ID
		user.AvatarURL = googleUser.Picture
		user.EmailVerified = googleUser.VerifiedEmail
		database.UpdateUser(user)
		return user, nil
	}

	// Create new user
	user = &models.User{
		FullName:      googleUser.Name,
		Email:         googleUser.Email,
		Provider:      "google",
		ProviderID:    googleUser.ID,
		EmailVerified: googleUser.VerifiedEmail,
		AvatarURL:     googleUser.Picture,
	}

	if err := database.CreateUser(user); err != nil {
		return nil, err
	}

	return user, nil
}
