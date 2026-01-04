package handlers

import (
	"encoding/json"
	"net/http"
	"runtime"
	"time"

	"pasti-pintar/backend/database"
	"pasti-pintar/backend/utils"
)

// HealthResponse represents the health check response
type HealthResponse struct {
	Status    string                 `json:"status"`
	Timestamp string                 `json:"timestamp"`
	Uptime    string                 `json:"uptime"`
	Checks    map[string]HealthCheck `json:"checks"`
	System    SystemInfo             `json:"system"`
}

// HealthCheck represents a single health check
type HealthCheck struct {
	Status  string `json:"status"`
	Message string `json:"message,omitempty"`
}

// SystemInfo represents system information
type SystemInfo struct {
	GoVersion      string `json:"go_version"`
	NumGoroutines  int    `json:"num_goroutines"`
	MemoryAllocMB  uint64 `json:"memory_alloc_mb"`
	BlacklistSize  int    `json:"blacklist_size"`
	OAuthStateSize int    `json:"oauth_state_size"`
}

var startTime = time.Now()

// Health returns a comprehensive health check
func Health(w http.ResponseWriter, r *http.Request) {
	checks := make(map[string]HealthCheck)

	// Check database connectivity
	dbStatus := checkDatabase()
	checks["database"] = dbStatus

	// Check email service
	emailStatus := checkEmailService()
	checks["email"] = emailStatus

	// Check OAuth configuration
	oauthStatus := checkOAuthConfig()
	checks["oauth"] = oauthStatus

	// Determine overall status
	overallStatus := "healthy"
	for _, check := range checks {
		if check.Status == "unhealthy" {
			overallStatus = "unhealthy"
			break
		} else if check.Status == "degraded" && overallStatus != "unhealthy" {
			overallStatus = "degraded"
		}
	}

	// Get system info
	var memStats runtime.MemStats
	runtime.ReadMemStats(&memStats)

	blacklist := utils.GetTokenBlacklist()
	stateManager := utils.GetOAuthStateManager()

	response := HealthResponse{
		Status:    overallStatus,
		Timestamp: time.Now().Format(time.RFC3339),
		Uptime:    time.Since(startTime).String(),
		Checks:    checks,
		System: SystemInfo{
			GoVersion:      runtime.Version(),
			NumGoroutines:  runtime.NumGoroutine(),
			MemoryAllocMB:  memStats.Alloc / 1024 / 1024,
			BlacklistSize:  blacklist.GetBlacklistSize(),
			OAuthStateSize: stateManager.GetStateCount(),
		},
	}

	statusCode := http.StatusOK
	if overallStatus == "unhealthy" {
		statusCode = http.StatusServiceUnavailable
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(response)
}

// Simple health check for load balancers
func HealthSimple(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status":"ok"}`))
}

func checkDatabase() HealthCheck {
	db := database.DB
	if db == nil {
		return HealthCheck{
			Status:  "unhealthy",
			Message: "Database not initialized",
		}
	}

	sqlDB, err := db.DB()
	if err != nil {
		return HealthCheck{
			Status:  "unhealthy",
			Message: "Cannot get database connection: " + err.Error(),
		}
	}

	if err := sqlDB.Ping(); err != nil {
		return HealthCheck{
			Status:  "unhealthy",
			Message: "Database ping failed: " + err.Error(),
		}
	}

	return HealthCheck{
		Status:  "healthy",
		Message: "Database connection OK",
	}
}

func checkEmailService() HealthCheck {
	// Check if SMTP is configured
	smtpUsername := utils.GetSMTPConfig()
	if smtpUsername == "" {
		return HealthCheck{
			Status:  "degraded",
			Message: "Email service not configured",
		}
	}

	return HealthCheck{
		Status:  "healthy",
		Message: "Email service configured",
	}
}

func checkOAuthConfig() HealthCheck {
	// Check if OAuth is configured
	if !utils.IsOAuthConfigured() {
		return HealthCheck{
			Status:  "degraded",
			Message: "OAuth not configured",
		}
	}

	return HealthCheck{
		Status:  "healthy",
		Message: "OAuth configured",
	}
}
