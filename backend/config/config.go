package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// config
var AppConfig struct {
	// JWT secret key
	JWTSecret string

	// Google OAuth credentials
	GoogleClientID     string
	GoogleClientSecret string
	GoogleRedirectURL  string

	// db connection
	DatabaseURL string

	FrontendURL string
}

// LoadConfig
func LoadConfig() {
	// Load .env file if it exists
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	getEnv := func(key, defaultValue string) string {
		if value := os.Getenv(key); value != "" {
			return value
		}
		return defaultValue
	}

	// Load all configuration values
	AppConfig.JWTSecret = getEnv("JWT_SECRET", "your-super-secret-key-change-in-production")
	AppConfig.GoogleClientID = getEnv("GOOGLE_CLIENT_ID", "")
	AppConfig.GoogleClientSecret = getEnv("GOOGLE_CLIENT_SECRET", "")
	AppConfig.GoogleRedirectURL = getEnv("GOOGLE_REDIRECT_URL", "http://localhost:8080/api/auth/google/callback")
	AppConfig.DatabaseURL = getEnv("DATABASE_URL", "./pasti_pintar.db")
	AppConfig.FrontendURL = getEnv("FRONTEND_URL", "http://localhost:3000")

	// Validate
	if AppConfig.GoogleClientID == "" {
		log.Println("GOOGLE_CLIENT_ID not set - Google OAuth will not work")
	}

	log.Println("Configuration loaded successfully")
}
