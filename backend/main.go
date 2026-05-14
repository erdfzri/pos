package main

import (
	"os"
	"posmart-backend/config"
	"posmart-backend/middleware"
	"posmart-backend/models"
	"posmart-backend/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize Database
	config.ConnectDatabase()

	// Auto Migrate models
	config.DB.AutoMigrate(&models.User{})

	// Initialize Gin
	r := gin.Default()

	// CORS Middleware
	r.Use(middleware.CORSMiddleware())

	// Setup Routes
	routes.SetupRoutes(r)

	// Get port from .env
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Run Server
	r.Run(":" + port)
}
