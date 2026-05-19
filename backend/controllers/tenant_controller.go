package controllers

import (
	"net/http"
	"posmart-backend/config"
	"posmart-backend/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type TenantResponse struct {
	ID          uint   `json:"id"`
	Name        string `json:"name"`
	Owner       string `json:"owner"`
	Email       string `json:"email"`
	WarungCount int64  `json:"warungCount"`
	Plan        string `json:"plan"`
	Status      string `json:"status"`
	JoinedDate  string `json:"joinedDate"`
}

type CreateTenantInput struct {
	Name  string `json:"name" binding:"required"`
	Owner string `json:"owner" binding:"required"`
	Email string `json:"email" binding:"required,email"`
	Plan  string `json:"plan"`
}

func GetTenants(c *gin.Context) {
	// 1. Authorization check: Ensure requester is Super Admin
	userID, _ := c.Get("user_id")
	var currentUser models.User
	if err := config.DB.First(&currentUser, userID).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}
	if currentUser.Role != "Super Admin" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Access denied: Super Admin role required"})
		return
	}

	// 2. Fetch all Merchant Owner accounts
	var users []models.User
	if err := config.DB.Where("role = ?", "Merchant Owner").Order("created_at desc").Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch tenants"})
		return
	}

	// 3. Map to responses and calculate warung count dynamically
	var responses []TenantResponse = []TenantResponse{}
	for _, user := range users {
		var count int64
		config.DB.Model(&models.Warung{}).Where("merchant_id = ?", user.ID).Count(&count)

		responses = append(responses, TenantResponse{
			ID:          user.ID,
			Name:        user.WarungName,
			Owner:       user.Username,
			Email:       user.Email,
			WarungCount: count,
			Plan:        user.Plan,
			Status:      user.Status,
			JoinedDate:  user.CreatedAt.Format("02 Jan 2006"),
		})
	}

	c.JSON(http.StatusOK, responses)
}

func CreateTenant(c *gin.Context) {
	// 1. Authorization check
	userID, _ := c.Get("user_id")
	var currentUser models.User
	if err := config.DB.First(&currentUser, userID).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}
	if currentUser.Role != "Super Admin" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Access denied: Super Admin role required"})
		return
	}

	// 2. Bind JSON Input
	var input CreateTenantInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 3. Generate default password 'merchant123'
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte("merchant123"), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	tenantPlan := input.Plan
	if tenantPlan == "" {
		tenantPlan = "Basic"
	}

	// 4. Create new User with Merchant Owner role
	tenantUser := models.User{
		Username:   input.Owner,
		Email:      input.Email,
		Password:   string(hashedPassword),
		Role:       "Merchant Owner",
		WarungName: input.Name,
		Plan:       tenantPlan,
		Status:     "Active",
	}

	if err := config.DB.Create(&tenantUser).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username or Email already exists"})
		return
	}

	c.JSON(http.StatusCreated, TenantResponse{
		ID:          tenantUser.ID,
		Name:        tenantUser.WarungName,
		Owner:       tenantUser.Username,
		Email:       tenantUser.Email,
		WarungCount: 0,
		Plan:        tenantUser.Plan,
		Status:      tenantUser.Status,
		JoinedDate:  tenantUser.CreatedAt.Format("02 Jan 2006"),
	})
}

func DeleteTenant(c *gin.Context) {
	// 1. Authorization check
	userID, _ := c.Get("user_id")
	var currentUser models.User
	if err := config.DB.First(&currentUser, userID).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}
	if currentUser.Role != "Super Admin" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Access denied: Super Admin role required"})
		return
	}

	// 2. Fetch tenant & soft-delete
	tenantID := c.Param("id")
	var tenant models.User
	if err := config.DB.First(&tenant, tenantID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Tenant not found"})
		return
	}

	if err := config.DB.Delete(&tenant).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete tenant"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Tenant successfully suspended/deleted"})
}
