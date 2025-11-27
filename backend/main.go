package main

import (
	"log"
	"net/http"
	"os"

	"pasti-pintar-backend/config"
	"pasti-pintar-backend/database"
	"pasti-pintar-backend/handlers"
	"pasti-pintar-backend/middleware"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	config.LoadConfig()
	database.Connect()

	// create react router
	router := mux.NewRouter()

	// define api router
	api := router.PathPrefix("/api").Subrouter()

	// GET /api/health
	api.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok","message":"Pasti Pintar API is running"}`))
	}).Methods("GET")

	api.HandleFunc("/signup", handlers.Signup).Methods("POST")
	api.HandleFunc("/login", handlers.Login).Methods("POST")
	api.HandleFunc("/forgot-password", handlers.ForgotPassword).Methods("POST")
	api.HandleFunc("/reset-password", handlers.ResetPassword).Methods("POST")
	api.HandleFunc("/auth/google", handlers.GoogleLogin).Methods("GET")
	api.HandleFunc("/auth/google/callback", handlers.GoogleCallback).Methods("GET")

	// Create a sub-router for protected routes
	protected := api.PathPrefix("").Subrouter()

	// JWT middleware
	protected.Use(middleware.JWTAuth)
	protected.HandleFunc("/me", handlers.GetCurrentUser).Methods("GET")
	protected.HandleFunc("/logout", handlers.Logout).Methods("POST")

	// Get frontend URL from environment (for production CORS)
	frontendURL := os.Getenv("FRONTEND_URL")
	allowedOrigins := []string{"http://localhost:3000", "http://localhost:3001"}
	if frontendURL != "" {
		allowedOrigins = append(allowedOrigins, frontendURL)
	}

	c := cors.New(cors.Options{
		AllowedOrigins:   allowedOrigins,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	})

	// Wrap our router with CORS middleware
	handler := c.Handler(router)

	// Start the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on http://localhost:%s", port)
	log.Printf("API endpoints available at http://localhost:%s/api", port)

	// ListenAndServe starts the HTTP server
	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}
