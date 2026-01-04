package database

import (
	"log"
	"strings"

	"pasti-pintar/backend/config"
	"pasti-pintar/backend/models"

	"gorm.io/driver/postgres"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// DB global
var DB *gorm.DB

// Connect establishes connection to the database
func Connect() {
	var err error
	var dialector gorm.Dialector

	dbURL := config.AppConfig.DatabaseURL
	dbType := config.AppConfig.DatabaseType

	// Auto-detect database type from URL if not explicitly set or set to default
	if dbType == "" || dbType == "sqlite" {
		if strings.HasPrefix(dbURL, "postgres://") || strings.HasPrefix(dbURL, "postgresql://") {
			dbType = "postgres"
		}
	}

	switch dbType {
	case "postgres":
		dialector = postgres.Open(dbURL)
		log.Println("Connecting to PostgreSQL database...")
	default:
		dialector = sqlite.Open(dbURL)
		log.Println("Connecting to SQLite database...")
	}

	DB, err = gorm.Open(dialector, &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Database connected successfully")

	err = DB.AutoMigrate(&models.User{}, &models.PasswordResetToken{})
	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	log.Println("Database migration completed")
}

// GetUserByEmail finds a user by their email address
func GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	result := DB.Where("email = ?", email).First(&user)

	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}

// GetUserByID finds a user by their ID
func GetUserByID(id uint) (*models.User, error) {
	var user models.User
	result := DB.First(&user, id)

	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}

// CreateUser inserts a new user into the database
func CreateUser(user *models.User) error {
	return DB.Create(user).Error
}

// UpdateUser updates an existing user
func UpdateUser(user *models.User) error {
	return DB.Save(user).Error
}

// GetUserByProviderID finds a user by OAuth provider ID (e.g., Google ID)
func GetUserByProviderID(provider, providerID string) (*models.User, error) {
	var user models.User
	result := DB.Where("provider = ? AND provider_id = ?", provider, providerID).First(&user)

	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}
