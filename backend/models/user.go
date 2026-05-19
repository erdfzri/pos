package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID         uint           `gorm:"primaryKey" json:"id"`
	Username   string         `gorm:"unique;not null" json:"username"`
	Email      string         `gorm:"unique;not null" json:"email"`
	Password   string         `gorm:"not null" json:"-"`
	Role       string         `gorm:"not null;default:'Staff / Kasir'" json:"role"`
	WarungName string         `json:"warung_name"`
	Plan       string         `gorm:"default:'Basic'" json:"plan"`
	Status     string         `gorm:"default:'Active'" json:"status"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`
}
