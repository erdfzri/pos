# Multi-stage build for Go backend
# Stage 1: Build the binary
FROM golang:1.25-alpine AS builder

# Set working directory
WORKDIR /app

# Install git and certificates (often needed)
RUN apk add --no-cache git ca-certificates

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the source code
COPY . .

# Build the Go application
# CGO_ENABLED=0 builds a statically linked binary
# GOOS=linux targets the Linux environment inside Docker
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o main .

# Stage 2: Final lightweight image
FROM alpine:latest

# Install ca-certificates and timezone data
RUN apk --no-cache add ca-certificates tzdata

WORKDIR /app

# Copy the compiled binary from the builder stage
COPY --from=builder /app/main .

# Expose port
EXPOSE 8080

# Command to run
CMD ["./main"]
