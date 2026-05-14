# Posmart Backend (Go)

Backend service built with **Go**, **Gin Gonic**, **GORM**, and **PostgreSQL**.

## Tech Stack
- **Framework**: [Gin Gonic](https://gin-gonic.com/)
- **ORM**: [GORM](https://gorm.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: [JWT (JSON Web Token)](https://jwt.io/)
- **Security**: Bcrypt for password hashing

## Getting Started

### Prerequisites
- Go 1.20+
- PostgreSQL database

### Installation

1. Copy `.env.example` (or use existing `.env`) and update your database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=yourpassword
   DB_NAME=posmart_db
   DB_PORT=5432
   ```

2. Install dependencies:
   ```bash
   go mod tidy
   ```

3. Run the application:
   ```bash
   go run main.go
   ```

## API Endpoints

### Auth
- `POST /api/auth/register` - Create a new user
- `POST /api/auth/login` - Login and get JWT token

### User (Protected)
- `GET /api/user/profile` - Get current user profile (Requires Bearer Token)
