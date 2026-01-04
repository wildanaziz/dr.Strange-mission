package utils

import (
	"os"

	"pasti-pintar/backend/config"
)

// GetSMTPConfig returns SMTP username if configured
func GetSMTPConfig() string {
	return os.Getenv("SMTP_USERNAME")
}

// IsOAuthConfigured checks if OAuth is properly configured
func IsOAuthConfigured() bool {
	return config.AppConfig.GoogleClientID != "" && config.AppConfig.GoogleClientSecret != ""
}
