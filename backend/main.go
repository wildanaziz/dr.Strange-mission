package main

import (
	"net/http"
	"os"
	"time"

	"pasti-pintar/backend/config"
	"pasti-pintar/backend/database"
	"pasti-pintar/backend/handlers"
	"pasti-pintar/backend/middleware"
	"pasti-pintar/backend/utils"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	utils.InitLogger()
	logger := utils.GetLogger()
	logger.Info().Msg("Starting Pasti Pintar Backend...")
	config.LoadConfig()
	database.Connect()
	utils.InitValidator()
	utils.InitTokenBlacklist()
	utils.InitOAuthStateManager()
	logger.Info().Msg("All services initialized successfully")
	router := mux.NewRouter()

	// Apply global middleware (order matters!)
	router.Use(middleware.RequestID)
	router.Use(middleware.LoggingMiddleware)
	router.Use(middleware.SecurityHeaders)
	router.Use(middleware.RequestSizeLimit(10 * 1024 * 1024))

	// if using with HTTPS for prod
	// router.Use(middleware.HTTPSRedirect)
	api := router.PathPrefix("/api").Subrouter()
	api.HandleFunc("/health", handlers.Health).Methods("GET")
	api.HandleFunc("/health/simple", handlers.HealthSimple).Methods("GET")
	rateLimiter := middleware.NewRateLimiter(100, time.Minute)
	publicRoutes := api.PathPrefix("").Subrouter()
	publicRoutes.Use(rateLimiter.Limit)
	publicRoutes.HandleFunc("/signup", handlers.Signup).Methods("POST")
	publicRoutes.HandleFunc("/login", handlers.Login).Methods("POST")
	publicRoutes.HandleFunc("/forgot-password", handlers.ForgotPassword).Methods("POST")
	publicRoutes.HandleFunc("/reset-password", handlers.ResetPassword).Methods("POST")
	publicRoutes.HandleFunc("/auth/google", handlers.GoogleLogin).Methods("GET")
	publicRoutes.HandleFunc("/auth/google/callback", handlers.GoogleCallback).Methods("GET")

	protected := api.PathPrefix("").Subrouter()
	protected.Use(middleware.JWTAuth)
	protected.Use(rateLimiter.Limit)
	protected.HandleFunc("/me", handlers.GetCurrentUser).Methods("GET")
	protected.HandleFunc("/logout", handlers.Logout).Methods("POST")

	frontendURL := os.Getenv("FRONTEND_URL")
	allowedOrigins := []string{"http://localhost:3000", "http://localhost:3001"}
	if frontendURL != "" {
		allowedOrigins = append(allowedOrigins, frontendURL)
	}

	c := cors.New(cors.Options{
		AllowedOrigins:   allowedOrigins,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type", "X-Request-ID"},
		AllowCredentials: true,
		ExposedHeaders:   []string{"X-Request-ID"},
	})

	handler := c.Handler(router)

	//start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	logger.Info().
		Str("port", port).
		Strs("allowed_origins", allowedOrigins).
		Msg("Server starting")

	logger.Info().
		Str("url", "http://localhost:"+port).
		Str("api", "http://localhost:"+port+"/api").
		Str("health", "http://localhost:"+port+"/api/health").
		Msg("Server endpoints")

	//ListenAndServe
	if err := http.ListenAndServe(":"+port, handler); err != nil {
		logger.Fatal().Err(err).Msg("Server failed to start")
	}
}
