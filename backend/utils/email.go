package utils

import (
	"fmt"
	"net/smtp"
	"os"
)

// SMTP configuration
type EmailConfig struct {
	Host     string
	Port     string
	Username string
	Password string
	From     string
}

// email configuration from environment variables
func GetEmailConfig() *EmailConfig {
	return &EmailConfig{
		Host:     getEnvOrDefault("SMTP_HOST", "smtp.gmail.com"),
		Port:     getEnvOrDefault("SMTP_PORT", "587"),
		Username: os.Getenv("SMTP_USERNAME"),
		Password: os.Getenv("SMTP_PASSWORD"),
		From:     getEnvOrDefault("SMTP_FROM", os.Getenv("SMTP_USERNAME")),
	}
}

func getEnvOrDefault(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

// SendEmail sends an email using SMTP
func SendEmail(to, subject, body string) error {
	config := GetEmailConfig()

	if config.Username == "" || config.Password == "" {
		return fmt.Errorf("email not configured: SMTP_USERNAME and SMTP_PASSWORD required")
	}

	auth := smtp.PlainAuth("", config.Username, config.Password, config.Host)

	// Compose email message
	mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
	msg := []byte(fmt.Sprintf(
		"From: %s\r\nTo: %s\r\nSubject: %s\r\n%s\r\n%s",
		config.From,
		to,
		subject,
		mime,
		body,
	))

	// Send email
	addr := fmt.Sprintf("%s:%s", config.Host, config.Port)
	err := smtp.SendMail(addr, auth, config.From, []string{to}, msg)
	if err != nil {
		return fmt.Errorf("failed to send email: %w", err)
	}

	return nil
}

// sends a password reset email with a reset link
func SendPasswordResetEmail(to, resetToken, frontendURL string) error {
	resetLink := fmt.Sprintf("%s/reset-password?token=%s", frontendURL, resetToken)

	subject := "Reset Password - Pasti Pintar"

	body := fmt.Sprintf(`
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #008fd7, #2f318a); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { color: white; margin: 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #008fd7; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        .button:hover { background: #0077b6; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        .warning { background: #fff3cd; border: 1px solid #ffc107; padding: 10px; border-radius: 5px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Pasti Pintar</h1>
        </div>
        <div class="content">
            <h2>Reset Password</h2>
            <p>Halo,</p>
            <p>Kami menerima permintaan untuk mereset password akun Pasti Pintar Anda.</p>
            <p>Klik tombol di bawah ini untuk membuat password baru:</p>
            
            <div style="text-align: center;">
                <a href="%s" class="button">Reset Password</a>
            </div>
            
            <p>Atau copy link berikut ke browser Anda:</p>
            <p style="word-break: break-all; background: #e9ecef; padding: 10px; border-radius: 5px;">%s</p>
            
            <div class="warning">
                <strong>[INFO] Penting:</strong> Link ini akan kadaluarsa dalam 1 jam. Jika Anda tidak meminta reset password, abaikan email ini.
            </div>
        </div>
        <div class="footer">
            <p>© 2025 Pasti Pintar. All rights reserved.</p>
            <p>Email ini dikirim secara otomatis, mohon tidak membalas email ini.</p>
        </div>
    </div>
</body>
</html>
`, resetLink, resetLink)

	return SendEmail(to, subject, body)
}
