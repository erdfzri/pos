package models

import (
	"time"

	"gorm.io/gorm"
)

type Warung struct {
	ID         uint           `gorm:"primaryKey" json:"id"`
	Name       string         `gorm:"not null" json:"name"`
	Address    string         `gorm:"not null" json:"address"`
	Phone      string         `json:"phone"`
	Admins     string         `json:"admins"` // Penanggung jawab
	Revenue    string         `gorm:"default:'Rp 0'" json:"revenue"`
	StaffCount int            `gorm:"default:0" json:"staff_count"`
	Status     string         `gorm:"default:'Active'" json:"status"`
	MerchantID uint           `gorm:"not null" json:"merchant_id"` // Hubungan ke Merchant Owner (User ID)
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`
}
