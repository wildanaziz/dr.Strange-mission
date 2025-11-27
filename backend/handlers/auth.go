package handlers

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"pasti-pintar-backend/database"
	"pasti-pintar-backend/middleware"
	"pasti-pintar-backend/models"
	"pasti-pintar-backend/utils"
)

// sendJSON sends a JSON response with the given status code
func sendJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

// sendError sends an error response
func sendError(w http.ResponseWriter, status int, errorCode, message string) {
	sendJSON(w, status, models.ErrorResponse{
		Error:   errorCode,
		Message: message,
	})
}

func Signup(w http.ResponseWriter, r *http.Request) {
	// Parse request body
	var req models.SignupRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		sendError(w, http.StatusBadRequest, "invalid_request", "Data tidak valid")
		return
	}

	// Validate input
	if req.FullName == "" || req.Email == "" || req.Password == "" {
		sendError(w, http.StatusBadRequest, "validation_error", "Nama, email, dan password wajib diisi")
		return
	}

	// Check password length
	if len(req.Password) < 8 {
		sendError(w, http.StatusBadRequest, "validation_error", "Password minimal 8 karakter")
		return
	}

	// Check password confirmation
	if req.Password != req.ConfirmPassword {
		sendError(w, http.StatusBadRequest, "validation_error", "Password tidak cocok")
		return
	}

	req.Email = strings.ToLower(strings.TrimSpace(req.Email))

	// Check if email already exists
	existingUser, _ := database.GetUserByEmail(req.Email)
	if existingUser != nil {
		sendError(w, http.StatusConflict, "email_exists", "Email sudah terdaftar")
		return
	}

	// Hash password
	hashedPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		log.Printf("Error hashing password: %v", err)
		sendError(w, http.StatusInternalServerError, "server_error", "Terjadi kesalahan server")
		return
	}

	// Create user in database
	user := &models.User{
		FullName: req.FullName,
		Email:    req.Email,
		Phone:    req.Phone,
		Password: hashedPassword,
		Provider: "",
	}

	if err := database.CreateUser(user); err != nil {
		log.Printf("Error creating user: %v", err)
		sendError(w, http.StatusInternalServerError, "server_error", "Gagal membuat akun")
		return
	}

	// Generate JWT token
	token, err := utils.GenerateToken(user.ID, user.Email)
	if err != nil {
		log.Printf("Error generating token: %v", err)
		sendError(w, http.StatusInternalServerError, "server_error", "Gagal membuat token")
		return
	}

	// Send success response
	log.Printf("New user registered: %s", user.Email)
	sendJSON(w, http.StatusCreated, models.AuthResponse{
		Message: "Akun berhasil dibuat",
		Token:   token,
		User:    *user,
	})
}

// Login with email/password
func Login(w http.ResponseWriter, r *http.Request) {
	// Parse request body
	var req models.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		sendError(w, http.StatusBadRequest, "invalid_request", "Data tidak valid")
		return
	}

	req.Email = strings.ToLower(strings.TrimSpace(req.Email))

	// Find user by email
	user, err := database.GetUserByEmail(req.Email)
	if err != nil {
		sendError(w, http.StatusUnauthorized, "invalid_credentials", "Email atau password salah")
		return
	}

	// Check if user signed up with OAuth
	if user.Provider != "" {
		sendError(w, http.StatusBadRequest, "oauth_account", "Akun ini terdaftar dengan Google. Silakan login dengan Google.")
		return
	}

	// Verify password
	if !utils.CheckPasswordHash(req.Password, user.Password) {
		sendError(w, http.StatusUnauthorized, "invalid_credentials", "Email atau password salah")
		return
	}

	// Generate JWT token
	token, err := utils.GenerateToken(user.ID, user.Email)
	if err != nil {
		log.Printf("Error generating token: %v", err)
		sendError(w, http.StatusInternalServerError, "server_error", "Gagal membuat token")
		return
	}

	// Send success response
	log.Printf("User logged in: %s", user.Email)
	sendJSON(w, http.StatusOK, models.AuthResponse{
		Message: "Login berhasil",
		Token:   token,
		User:    *user,
	})
}

// Request password reset
func ForgotPassword(w http.ResponseWriter, r *http.Request) {
	//Parse request body
	var req models.ForgotPasswordRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		sendError(w, http.StatusBadRequest, "invalid_request", "Data tidak valid")
		return
	}

	req.Email = strings.ToLower(strings.TrimSpace(req.Email))

	// Step 2: Check if user exists
	user, err := database.GetUserByEmail(req.Email)
	if err != nil {
		sendJSON(w, http.StatusOK, map[string]string{
			"message": "Jika email terdaftar, link reset password akan dikirim",
		})
		return
	}

	//Check if user signed up with OAuth
	if user.Provider != "" {
		sendJSON(w, http.StatusOK, map[string]string{
			"message": "Jika email terdaftar, link reset password akan dikirim",
		})
		return
	}

	//Generate unique reset token
	tokenBytes := make([]byte, 32)
	if _, err := rand.Read(tokenBytes); err != nil {
		log.Printf("Error generating token: %v", err)
		sendError(w, http.StatusInternalServerError, "server_error", "Gagal membuat token")
		return
	}
	resetToken := hex.EncodeToString(tokenBytes)

	// Delete any existing tokens for this user
	database.DB.Where("user_id = ?", user.ID).Delete(&models.PasswordResetToken{})

	//save token to database (expires in 1 hour)
	passwordResetToken := models.PasswordResetToken{
		UserID:    user.ID,
		Token:     resetToken,
		ExpiresAt: time.Now().Add(1 * time.Hour),
		Used:      false,
	}

	if err := database.DB.Create(&passwordResetToken).Error; err != nil {
		log.Printf("Error saving reset token: %v", err)
		sendError(w, http.StatusInternalServerError, "server_error", "Gagal menyimpan token")
		return
	}

	//Send reset email
	smtpUsername := os.Getenv("SMTP_USERNAME")
	smtpPassword := os.Getenv("SMTP_PASSWORD")
	frontendURL := os.Getenv("FRONTEND_URL")
	if frontendURL == "" {
		frontendURL = "http://localhost:3000"
	}

	if smtpUsername != "" && smtpPassword != "" {
		if err := utils.SendPasswordResetEmail(user.Email, resetToken, frontendURL); err != nil {
			log.Printf("Error sending email: %v", err)
		} else {
			log.Printf("Password reset email sent to: %s", user.Email)
		}
	} else {
		log.Printf("Email not configured. Reset token for %s: %s", user.Email, resetToken)
		log.Printf("Reset link would be: %s/reset-password?token=%s", frontendURL, resetToken)
	}

	sendJSON(w, http.StatusOK, map[string]string{
		"message": "Jika email terdaftar, link reset password akan dikirim",
	})
}

// Reset password with token
func ResetPassword(w http.ResponseWriter, r *http.Request) {
	//Parse request body
	var req models.ResetPasswordRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		sendError(w, http.StatusBadRequest, "invalid_request", "Data tidak valid")
		return
	}

	// Validate input
	if req.Token == "" {
		sendError(w, http.StatusBadRequest, "missing_token", "Token tidak ditemukan")
		return
	}

	if req.Password == "" {
		sendError(w, http.StatusBadRequest, "missing_password", "Password baru harus diisi")
		return
	}

	if len(req.Password) < 6 {
		sendError(w, http.StatusBadRequest, "weak_password", "Password minimal 6 karakter")
		return
	}

	if req.Password != req.ConfirmPassword {
		sendError(w, http.StatusBadRequest, "password_mismatch", "Password tidak cocok")
		return
	}

	//Find token in database
	var resetToken models.PasswordResetToken
	if err := database.DB.Where("token = ?", req.Token).First(&resetToken).Error; err != nil {
		sendError(w, http.StatusBadRequest, "invalid_token", "Token tidak valid atau sudah kadaluarsa")
		return
	}

	// Check if token is valid (not expired and not used)
	if resetToken.Used {
		sendError(w, http.StatusBadRequest, "token_used", "Token sudah digunakan")
		return
	}

	if time.Now().After(resetToken.ExpiresAt) {
		sendError(w, http.StatusBadRequest, "token_expired", "Token sudah kadaluarsa")
		return
	}

	// Get user
	user, err := database.GetUserByID(resetToken.UserID)
	if err != nil {
		sendError(w, http.StatusBadRequest, "user_not_found", "User tidak ditemukan")
		return
	}

	// Hash new password
	hashedPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		log.Printf("Error hashing password: %v", err)
		sendError(w, http.StatusInternalServerError, "server_error", "Gagal mengubah password")
		return
	}

	// Update user password
	if err := database.DB.Model(&user).Update("password", hashedPassword).Error; err != nil {
		log.Printf("Error updating password: %v", err)
		sendError(w, http.StatusInternalServerError, "server_error", "Gagal mengubah password")
		return
	}

	// Step 8: Mark token as used
	database.DB.Model(&resetToken).Update("used", true)

	log.Printf("Password reset successful for: %s", user.Email)
	sendJSON(w, http.StatusOK, map[string]string{
		"message": "Password berhasil diubah. Silakan login dengan password baru.",
	})
}

// Get current user profile (Protected)
func GetCurrentUser(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserIDFromContext(r)
	if userID == 0 {
		sendError(w, http.StatusUnauthorized, "unauthorized", "Unauthorized")
		return
	}

	user, err := database.GetUserByID(userID)
	if err != nil {
		sendError(w, http.StatusNotFound, "not_found", "User tidak ditemukan")
		return
	}

	sendJSON(w, http.StatusOK, user)
}

// Logout
func Logout(w http.ResponseWriter, r *http.Request) {
	log.Printf("User logged out")
	sendJSON(w, http.StatusOK, map[string]string{
		"message": "Logout berhasil",
	})
}
