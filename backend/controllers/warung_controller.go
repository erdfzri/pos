package controllers

import (
	"net/http"
	"posmart-backend/config"
	"posmart-backend/models"

	"github.com/gin-gonic/gin"
)

type CreateWarungInput struct {
	Name    string `json:"name" binding:"required"`
	Address string `json:"address" binding:"required"`
	Phone   string `json:"phone"`
	Admins  string `json:"admins"`
}

func GetWarungs(c *gin.Context) {
	userID, _ := c.Get("user_id")
	var currentUser models.User
	if err := config.DB.First(&currentUser, userID).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	var warungs []models.Warung
	
	// Super Admin can see all warungs globally, while Merchant Owners see only their own branches.
	if currentUser.Role == "Super Admin" {
		if err := config.DB.Order("created_at desc").Find(&warungs).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch all warungs"})
			return
		}
	} else if currentUser.Role == "Merchant Owner" {
		if err := config.DB.Where("merchant_id = ?", currentUser.ID).Order("created_at desc").Find(&warungs).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch your warungs"})
			return
		}
	} else {
		// Staff / Store Admin see only their specific assigned warung (or no access)
		// For simplicity, let's return warungs matching their associated warung name or return empty
		c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
		return
	}

	c.JSON(http.StatusOK, warungs)
}

func CreateWarung(c *gin.Context) {
	userID, _ := c.Get("user_id")
	var currentUser models.User
	if err := config.DB.First(&currentUser, userID).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	// Only Merchant Owners can register new physical warung branches
	if currentUser.Role != "Merchant Owner" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Access denied: Merchant Owner role required"})
		return
	}

	var input CreateWarungInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	adminsVal := input.Admins
	if adminsVal == "" {
		adminsVal = "Belum Ditunjuk"
	}

	phoneVal := input.Phone
	if phoneVal == "" {
		phoneVal = "N/A"
	}

	newWarung := models.Warung{
		Name:       input.Name,
		Address:    input.Address,
		Phone:      phoneVal,
		Admins:     adminsVal,
		Revenue:    "Rp 0",
		StaffCount: 0,
		Status:     "Active",
		MerchantID: currentUser.ID,
	}

	if err := config.DB.Create(&newWarung).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create warung branch"})
		return
	}

	c.JSON(http.StatusCreated, newWarung)
}

func DeleteWarung(c *gin.Context) {
	userID, _ := c.Get("user_id")
	var currentUser models.User
	if err := config.DB.First(&currentUser, userID).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	// Only Merchant Owners can delete their physical warung branches
	if currentUser.Role != "Merchant Owner" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Access denied: Merchant Owner role required"})
		return
	}

	warungID := c.Param("id")
	var warung models.Warung
	if err := config.DB.Where("id = ? AND merchant_id = ?", warungID, currentUser.ID).First(&warung).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Warung branch not found or access denied"})
		return
	}

	if err := config.DB.Delete(&warung).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete warung branch"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Warung branch successfully deleted"})
}
