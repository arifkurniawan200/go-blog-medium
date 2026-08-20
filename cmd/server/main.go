package main

import (
	"fmt"
	"log"
	"net/http"

	"go-modular/internal/application/usecase"
	"go-modular/internal/infrastructure/config"
	"go-modular/internal/infrastructure/handler"
	"go-modular/internal/infrastructure/repository"

	"github.com/go-chi/chi/v5"
)

func main() {
	cfg := config.Load()

	r := chi.NewRouter()

	userRepo := repository.NewMockUserRepository()
	postRepo := repository.NewMockPostRepository()
	tagRepo := repository.NewMockTagRepository()

	userUC := usecase.NewUserUseCase(userRepo)
	postUC := usecase.NewPostUseCase(postRepo, tagRepo, userRepo)

	userHandler := handler.NewUserHandler(userUC)
	postHandler := handler.NewPostHandler(postUC)

	r.Get("/health", func(w http.ResponseWriter, _ *http.Request) {
		w.Write([]byte(`{"status":"ok"}`))
	})

	r.Route("/api/v1", func(r chi.Router) {
		r.Route("/users", func(r chi.Router) {
			r.Post("/", userHandler.Create)
			r.Get("/", userHandler.List)
			r.Get("/{id}", userHandler.GetByID)
			r.Put("/{id}", userHandler.Update)
			r.Delete("/{id}", userHandler.Delete)
		})

		r.Route("/posts", func(r chi.Router) {
			r.Post("/", postHandler.Create)
			r.Get("/", postHandler.List)
			r.Get("/{id}", postHandler.GetByID)
			r.Get("/slug/{slug}", postHandler.GetBySlug)
			r.Put("/{id}", postHandler.Update)
			r.Delete("/{id}", postHandler.Delete)
		})
	})

	addr := fmt.Sprintf(":%s", cfg.ServerPort)
	log.Printf("server running on %s", addr)
	if err := http.ListenAndServe(addr, r); err != nil {
		log.Fatal(err)
	}
}
