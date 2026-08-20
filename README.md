# Medium-Like Blog API

Go monolith Clean Architecture blog API — follower system, bookmarks, likes, tags, rich posts. SOLID principles throughout.

## Tech Stack

- **Go 1.22** + Chi router v5
- Clean Architecture (Domain → Application → Infrastructure → Presentation)
- In-memory mock repositories (swap to PostgreSQL via repository interfaces)
- SOLID principles: Dependency Inversion, Interface Segregation, etc.

## Architecture

```
cmd/server/               # Entry point
internal/
├── domain/
│   ├── entities/         # User, Post, Tag, Follow, Bookmark, Like, Clap
│   └── repositories/     # Repository interfaces (abstractions)
├── application/
│   ├── dto/              # Request/Response DTOs
│   └── usecase/          # Business logic (follow, post, interaction, bookmark)
├── infrastructure/
│   ├── handler/          # HTTP handlers
│   ├── repository/       # Mock implementations (pluggable)
│   └── config/
pkg/
├── response/             # Standardized JSON responses
├── pager/                # Pagination
└── validator/
migrations/               # SQL schema
```

## API Endpoints

### Users
```
POST   /api/v1/users                    Create user
GET    /api/v1/users                    List users (paginated)
GET    /api/v1/users/:id                Get user
PUT    /api/v1/users/:id                Update user
DELETE /api/v1/users/:id                Delete user
POST   /api/v1/users/:id/follow         Follow user
DELETE /api/v1/users/:id/follow         Unfollow user
GET    /api/v1/users/:id/followers       Get followers (paginated)
GET    /api/v1/users/:id/following       Get following (paginated)
```

### Posts
```
POST   /api/v1/posts                    Create post
GET    /api/v1/posts                    List posts (filter: ?status=published)
GET    /api/v1/posts/:id                Get post by ID
GET    /api/v1/posts/slug/:slug         Get post by slug
PUT    /api/v1/posts/:id                Update post
DELETE /api/v1/posts/:id                Delete post

POST   /api/v1/posts/:id/like          Like post
DELETE /api/v1/posts/:id/like          Unlike post
GET    /api/v1/posts/:id/likes          Get like count

POST   /api/v1/posts/:id/bookmark       Bookmark post
DELETE /api/v1/posts/:id/bookmark       Remove bookmark
```

### Me
```
GET    /api/v1/me/bookmarks             Get my bookmarks
GET    /api/v1/me/following             Get who I follow
```

### Health
```
GET /health
```

## Authentication

Pasang `X-User-ID` header untuk operasi yang butuh user identity:

```bash
curl -X POST http://localhost:8080/api/v1/posts \
  -H "Content-Type: application/json" \
  -H "X-User-ID: user-123" \
  -d '{"title":"My First Post","content":"Hello world!","tags":["golang","blog"]}'
```

## Setup

```bash
# Clone
git clone https://github.com/arifkurniawan200/go-blog-medium.git
cd go-blog-medium

# Tidy dependencies
go mod tidy

# Run (mock in-memory — no DB needed)
go run cmd/server/main.go
```

## Setup dengan PostgreSQL

```bash
# Buat DB
psql $DATABASE_URL -c "CREATE DATABASE blog;"

# Migration
psql $DATABASE_URL -f migrations/001_init.sql

# Set env
export DATABASE_URL=postgres://user:***@localhost:5432/blog?sslmode=disable
go run cmd/server/main.go
```

## Contoh Request

```bash
# 1. Buat user
curl -X POST http://localhost:8080/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"secret123"}'

# 2. Buat post
curl -X POST http://localhost:8080/api/v1/posts \
  -H "Content-Type: application/json" \
  -H "X-User-ID: <user-id>" \
  -d '{"title":"Getting Started with Go","content":"Go is awesome...","tags":["golang"],"status":"published"}'

# 3. Like post
curl -X POST http://localhost:8080/api/v1/posts/<post-id>/like \
  -H "X-User-ID: <user-id>"

# 4. Bookmark post
curl -X POST http://localhost:8080/api/v1/posts/<post-id>/bookmark \
  -H "X-User-ID: <user-id>"

# 5. Follow author
curl -X POST http://localhost:8080/api/v1/users/<author-id>/follow \
  -H "X-User-ID: <user-id>"

# 6. List published posts
curl "http://localhost:8080/api/v1/posts?status=published&page=1&limit=10"
```

## SOLID di Project Ini

| Principle | How |
|-----------|-----|
| **S**ingle Responsibility | `FollowUseCase` hanya soal follow logic, tidak tahu HTTP |
| **O**pen/Closed | Tambah repository baru (Redis, MongoDB) tanpa ubah use case |
| **L**iskov Substitution | `MockFollowRepository` ↔ `*pgRepo.FollowRepository`互换 |
| **I**nterface Segregation | `FollowRepository`, `BookmarkRepository` pisah — tidak 1 giant interface |
| **D**ependency Inversion | `FollowUseCase` tergantung `repositories.FollowRepository` interface, bukan concrete type |
