package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"pasti-pintar/backend/config"
	"pasti-pintar/backend/database"
	"pasti-pintar/backend/models"
	"pasti-pintar/backend/utils"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var googleOAuthConfig *oauth2.Config

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
	if config.AppConfig.GoogleClientID == "" {
		sendError(w, http.StatusServiceUnavailable, "oauth_not_configured", "Google OAuth belum dikonfigurasi")
		return
	}

	oauthConfig := getGoogleOAuthConfig()

	stateManager := utils.GetOAuthStateManager()
	state, err := stateManager.GenerateState()
	if err != nil {
		utils.LogError(err, "Error generating OAuth state", nil)
		sendError(w, http.StatusInternalServerError, "server_error", "Terjadi kesalahan server")
		return
	}

	url := oauthConfig.AuthCodeURL(state, oauth2.AccessTypeOffline)

	utils.LogInfo("Redirecting to Google OAuth", map[string]interface{}{
		"state": state,
	})
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

// Handle Google OAuth callback
func GoogleCallback(w http.ResponseWriter, r *http.Request) {
	state := r.URL.Query().Get("state")
	if state == "" {
		utils.LogWarn("OAuth callback missing state", nil)
		http.Redirect(w, r, config.AppConfig.FrontendURL+"/login?error=invalid_state", http.StatusTemporaryRedirect)
		return
	}

	stateManager := utils.GetOAuthStateManager()
	if !stateManager.ValidateState(state) {
		utils.LogWarn("OAuth callback invalid state", map[string]interface{}{
			"state": state,
		})
		http.Redirect(w, r, config.AppConfig.FrontendURL+"/login?error=invalid_state", http.StatusTemporaryRedirect)
		return
	}

	code := r.URL.Query().Get("code")
	if code == "" {
		utils.LogWarn("OAuth callback missing code", nil)
		http.Redirect(w, r, config.AppConfig.FrontendURL+"/login?error=oauth_failed", http.StatusTemporaryRedirect)
		return
	}

	oauthConfig := getGoogleOAuthConfig()
	token, err := oauthConfig.Exchange(context.Background(), code)
	if err != nil {
		utils.LogError(err, "Failed to exchange OAuth code", nil)
		http.Redirect(w, r, config.AppConfig.FrontendURL+"/login?error=oauth_failed", http.StatusTemporaryRedirect)
		return
	}

	userInfo, err := getGoogleUserInfo(token.AccessToken)
	if err != nil {
		utils.LogError(err, "Failed to get Google user info", nil)
		http.Redirect(w, r, config.AppConfig.FrontendURL+"/login?error=oauth_failed", http.StatusTemporaryRedirect)
		return
	}

	utils.LogInfo("Google user info retrieved", map[string]interface{}{
		"name":  userInfo.Name,
		"email": userInfo.Email,
	})

	user, err := findOrCreateGoogleUser(userInfo)
	if err != nil {
		utils.LogError(err, "Failed to create Google user", map[string]interface{}{
			"email": userInfo.Email,
		})
		http.Redirect(w, r, config.AppConfig.FrontendURL+"/login?error=oauth_failed", http.StatusTemporaryRedirect)
		return
	}

	jwtToken, err := utils.GenerateToken(user.ID, user.Email)
	if err != nil {
		utils.LogError(err, "Failed to generate JWT token", map[string]interface{}{
			"user_id": user.ID,
		})
		http.Redirect(w, r, config.AppConfig.FrontendURL+"/login?error=oauth_failed", http.StatusTemporaryRedirect)
		return
	}

	redirectURL := fmt.Sprintf("%s/auth/callback?token=%s", config.AppConfig.FrontendURL, jwtToken)
	utils.LogInfo("Google OAuth successful", map[string]interface{}{
		"user_id": user.ID,
		"email":   user.Email,
	})
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
	user, err := database.GetUserByProviderID("google", googleUser.ID)
	if err == nil {
		user.FullName = googleUser.Name
		user.AvatarURL = googleUser.Picture
		user.EmailVerified = googleUser.VerifiedEmail
		database.UpdateUser(user)
		return user, nil
	}

	user, err = database.GetUserByEmail(googleUser.Email)
	if err == nil {
		user.Provider = "google"
		user.ProviderID = googleUser.ID
		user.AvatarURL = googleUser.Picture
		user.EmailVerified = googleUser.VerifiedEmail
		database.UpdateUser(user)
		return user, nil
	}

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
