package models

import (
	"time"

	"gorm.io/gorm"
)

// User represents a user in our system
type User struct {
	ID            uint           `json:"id" gorm:"primaryKey"`
	FullName      string         `json:"full_name" gorm:"size:255"`
	Email         string         `json:"email" gorm:"uniqueIndex;size:255;not null"`
	Phone         string         `json:"phone" gorm:"size:20"`
	Password      string         `json:"-" gorm:"size:255"`
	Provider      string         `json:"provider" gorm:"size:50"`
	ProviderID    string         `json:"-" gorm:"size:255"`
	EmailVerified bool           `json:"email_verified" gorm:"default:false"`
	AvatarURL     string         `json:"avatar_url" gorm:"size:500"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
	DeletedAt     gorm.DeletedAt `json:"-" gorm:"index"`
}

// SignupRequest data sent from frontend signup form
type SignupRequest struct {
	FullName        string `json:"full_name" validate:"required,min=2"`
	Email           string `json:"email" validate:"required,email"`
	Phone           string `json:"phone"`
	Password        string `json:"password" validate:"required,min=8"`
	ConfirmPassword string `json:"confirm_password" validate:"required"`
}

// LoginRequest for data sent from frontend login form
type LoginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

// ForgotPasswordRequest for password reset
type ForgotPasswordRequest struct {
	Email string `json:"email" validate:"required,email"`
}

// AuthResponse for data sent back after successful login/signup
type AuthResponse struct {
	Message string `json:"message"`
	Token   string `json:"token"`
	User    User   `json:"user"`
}

// standardized error format
type ErrorResponse struct {
	Error   string `json:"error"`
	Message string `json:"message"`
}

// stores password reset tokens
type PasswordResetToken struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	UserID    uint      `json:"user_id" gorm:"index"`
	Token     string    `json:"token" gorm:"uniqueIndex;size:255"`
	ExpiresAt time.Time `json:"expires_at"`
	Used      bool      `json:"used" gorm:"default:false"`
	CreatedAt time.Time `json:"created_at"`
}

// for data for resetting password with token
type ResetPasswordRequest struct {
	Token           string `json:"token" validate:"required"`
	Password        string `json:"password" validate:"required,min=8"`
	ConfirmPassword string `json:"confirm_password" validate:"required"`
}
