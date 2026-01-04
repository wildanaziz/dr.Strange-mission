package utils

import (
	"regexp"
	"strings"

	"github.com/go-playground/validator/v10"
)

var validate *validator.Validate

// InitValidator initializes the validator with custom validations
func InitValidator() {
	validate = validator.New()

	// Register custom validators
	validate.RegisterValidation("phone", validatePhone)
	validate.RegisterValidation("strong_password", validateStrongPassword)
}

// GetValidator returns the validator instance
func GetValidator() *validator.Validate {
	if validate == nil {
		InitValidator()
	}
	return validate
}

// validatePhone validates Indonesian phone numbers
func validatePhone(fl validator.FieldLevel) bool {
	phone := fl.Field().String()
	if phone == "" {
		return true // Allow empty (use required tag separately)
	}

	// Indonesian phone pattern: starts with 08 or +62 or 62
	// Allows 10-15 digits
	phoneRegex := regexp.MustCompile(`^(\+62|62|0)8[0-9]{8,13}$`)
	return phoneRegex.MatchString(phone)
}

// validateStrongPassword validates password strength
func validateStrongPassword(fl validator.FieldLevel) bool {
	password := fl.Field().String()

	// At least 8 characters
	if len(password) < 8 {
		return false
	}

	// Contains at least one number
	hasNumber := regexp.MustCompile(`[0-9]`).MatchString(password)
	// Contains at least one letter
	hasLetter := regexp.MustCompile(`[a-zA-Z]`).MatchString(password)

	return hasNumber && hasLetter
}

// ValidateStruct validates a struct and returns user-friendly error messages
func ValidateStruct(s interface{}) map[string]string {
	v := GetValidator()
	err := v.Struct(s)

	if err == nil {
		return nil
	}

	errors := make(map[string]string)

	for _, err := range err.(validator.ValidationErrors) {
		field := strings.ToLower(err.Field())

		switch err.Tag() {
		case "required":
			errors[field] = field + " wajib diisi"
		case "email":
			errors[field] = "Format email tidak valid"
		case "min":
			errors[field] = field + " minimal " + err.Param() + " karakter"
		case "max":
			errors[field] = field + " maksimal " + err.Param() + " karakter"
		case "eqfield":
			errors[field] = field + " harus sama dengan " + err.Param()
		case "phone":
			errors[field] = "Format nomor telepon tidak valid (gunakan format: 08xx atau +62)"
		case "strong_password":
			errors[field] = "Password harus minimal 8 karakter dan mengandung huruf dan angka"
		default:
			errors[field] = field + " tidak valid"
		}
	}

	return errors
}

// SanitizeString removes potentially dangerous characters from strings
func SanitizeString(s string) string {
	// Remove leading/trailing whitespace
	s = strings.TrimSpace(s)

	// Remove null bytes
	s = strings.ReplaceAll(s, "\x00", "")

	return s
}

// NormalizeEmail normalizes email addresses
func NormalizeEmail(email string) string {
	email = strings.TrimSpace(email)
	email = strings.ToLower(email)
	return email
}

// ValidatePasswordStrength checks password strength and returns detailed feedback
func ValidatePasswordStrength(password string) (bool, []string) {
	var issues []string

	if len(password) < 8 {
		issues = append(issues, "Password minimal 8 karakter")
	}

	if !regexp.MustCompile(`[a-z]`).MatchString(password) {
		issues = append(issues, "Password harus mengandung huruf kecil")
	}

	if !regexp.MustCompile(`[A-Z]`).MatchString(password) {
		issues = append(issues, "Password harus mengandung huruf besar")
	}

	if !regexp.MustCompile(`[0-9]`).MatchString(password) {
		issues = append(issues, "Password harus mengandung angka")
	}

	if !regexp.MustCompile(`[!@#$%^&*(),.?":{}|<>]`).MatchString(password) {
		issues = append(issues, "Password disarankan mengandung karakter spesial")
	}

	return len(issues) == 0, issues
}
