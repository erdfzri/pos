package routes

import (
	"posmart-backend/controllers"
	"posmart-backend/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/register", controllers.Register)
			auth.POST("/login", controllers.Login)
		}

		// Protected routes
		protected := api.Group("")
		protected.Use(middleware.AuthMiddleware())
		{
			protected.GET("/user/profile", controllers.Profile)

			// Tenant / B2B Subscribing Clients (Super Admin)
			protected.GET("/tenants", controllers.GetTenants)
			protected.POST("/tenants", controllers.CreateTenant)
			protected.DELETE("/tenants/:id", controllers.DeleteTenant)

			// Warung / Outlet Branches (Merchant Owner / Super Admin)
			protected.GET("/warungs", controllers.GetWarungs)
			protected.POST("/warungs", controllers.CreateWarung)
			protected.DELETE("/warungs/:id", controllers.DeleteWarung)
		}
	}
}
