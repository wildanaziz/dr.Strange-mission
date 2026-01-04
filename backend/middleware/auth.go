package middleware

import (
	"context"
	"net/http"
	"strings"

	"pasti-pintar/backend/utils"
)

// for storing data in request context
type ContextKey string

const (
	UserIDKey    ContextKey = "userID"
	UserEmailKey ContextKey = "userEmail"
)

// function that validates JWT tokens
func JWTAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Get token from Authorization header
		authHeader := r.Header.Get("Authorization")

		// Check if header exists
		if authHeader == "" {
			http.Error(w, `{"error": "unauthorized", "message": "Token tidak ditemukan"}`, http.StatusUnauthorized)
			return
		}

		//Extract token from "Bearer <token>" format
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			http.Error(w, `{"error": "unauthorized", "message": "Format token tidak valid"}`, http.StatusUnauthorized)
			return
		}
		tokenString := parts[1]

		//Validate token
		claims, err := utils.ValidateToken(tokenString)
		if err != nil {
			http.Error(w, `{"error": "unauthorized", "message": "Token tidak valid atau sudah expired"}`, http.StatusUnauthorized)
			return
		}

		// Check if token is blacklisted (logged out)
		blacklist := utils.GetTokenBlacklist()
		if blacklist.IsBlacklisted(tokenString) {
			http.Error(w, `{"error": "unauthorized", "message": "Token sudah tidak valid (logged out)"}`, http.StatusUnauthorized)
			return
		}

		//Add user info to request context
		ctx := context.WithValue(r.Context(), UserIDKey, claims.UserID)
		ctx = context.WithValue(ctx, UserEmailKey, claims.Email)

		//Continue to the actual handler
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// function for use in handlers
func GetUserIDFromContext(r *http.Request) uint {
	userID, ok := r.Context().Value(UserIDKey).(uint)
	if !ok {
		return 0
	}
	return userID
}

// extracts user email from request context
func GetUserEmailFromContext(r *http.Request) string {
	email, ok := r.Context().Value(UserEmailKey).(string)
	if !ok {
		return ""
	}
	return email
}
