# Go Modular Monolith Template

Go monolith dengan **Clean Architecture + SOLID principles**. Langsung bisa dipake untuk project baru.

## Struktur

```
go-modular/
├── cmd/server/              # Entry point
├── internal/
│   ├── domain/
│   │   ├── entities/        # Domain models
│   │   │   ├── user.go
│   │   │   ├── post.go
│   │   │   ├── comment.go
│   │   │   └── tag.go
│   │   └── repositories/     # Repository interfaces (abstractions)
│   │       └── interfaces.go
│   ├── application/
│   │   ├── dto/             # Request/Response DTOs
│   │   └── usecase/         # Business logic (depends on interfaces only)
│   ├── infrastructure/
│   │   ├── config/          # Configuration loading from env
│   │   ├── handler/         # HTTP handlers (depends on use cases)
│   │   ├── middleware/      # HTTP middleware (CORS, Logger, etc.)
│   │   └── repository/      # Concrete implementations (MySQL, PostgreSQL, Mock)
│   └── pkg/
│       ├── response/        # Standardized API responses
│       ├── pager/           # Pagination helper
│       └── validator/       # Input validators
├── migrations/              # SQL migrations
└── README.md
```

## SOLID Principles

| Principle | Implementation |
|-----------|----------------|
| **S**ingle Responsibility | Setiap layer punya 1 job: domain=model, application=logic, infrastructure=external |
| **O**pen/Closed | Repository baru (Redis, MongoDB) tinggal implement interface — use case tidak berubah |
| **L**iskov Substitution | Semua implementasi repository bisa互换 (Mock, MySQL, PostgreSQL) tanpa ubah use case |
| **I**nterface Segregation | interfaces.go pisah per domain (UserRepository, PostRepository) — kecil & fokus |
| **D**ependency Inversion | Use case tergantung interface, bukan concrete repo — infrastructure di-inject |

## Dependency Flow

```
HTTP Request
    ↓
Handler (infrastructure)       ← depends on → UseCase (application)
    ↓                                                          ↑
Repository (infrastructure)  ← implements ─ Repository Interface (domain)
    ↓
Database
```

## Setup

```bash
git clone https://github.com/arifkurniawan200/go-modular-template.git my-project
cd my-project
go mod tidy
go run cmd/server/main.go
```

## Setup dengan PostgreSQL

```bash
# Buat database
psql $DATABASE_URL -c "CREATE DATABASE blog;"

# Jalankan migration
psql $DATABASE_URL -f migrations/001_init.sql

# Set env
export DATABASE_URL=postgres://user:pass@localhost:5432/blog?sslmode=disable
export SERVER_PORT=8080
export JWT_SECRET=change-me

go run cmd/server/main.go
```

## API Endpoints

```
Users:
  POST   /api/v1/users          → Create user
  GET    /api/v1/users          → List users (pagination)
  GET    /api/v1/users/:id      → Get user by ID
  PUT    /api/v1/users/:id      → Update user
  DELETE /api/v1/users/:id      → Delete user

Posts:
  POST   /api/v1/posts          → Create post
  GET    /api/v1/posts          → List posts (filter by status)
  GET    /api/v1/posts/:id      → Get post by ID
  GET    /api/v1/posts/slug/:slug → Get post by slug
  PUT    /api/v1/posts/:id      → Update post
  DELETE /api/v1/posts/:id      → Delete post

Health:
  GET /health
```

## Contoh Response

```json
// GET /api/v1/users
{
  "success": true,
  "data": [
    { "id": "user-xxxx", "email": "john@example.com", "name": "John", "role": "user" }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "total_pages": 3
  }
}
```

## bikin Module Baru

1. Tambah entity di `internal/domain/entities/`
2. Tambah interface di `internal/domain/repositories/interfaces.go`
3. Tambah DTO di `internal/application/dto/`
4. Tambah use case di `internal/application/usecase/`
5. Tambah repository implementation di `internal/infrastructure/repository/`
6. Tambah handler di `internal/infrastructure/handler/`
7. Register route di `cmd/server/main.go`

Tidak perlu ubah layer lain — SOLID compliance.

## Tech Stack

- Go 1.22+
- Chi router v5
- PostgreSQL + GORM (via repository pattern)
- In-memory mock repositories (for testing/development)
