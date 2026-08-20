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
	followRepo := repository.NewMockFollowRepository()
	likeRepo := repository.NewMockLikeRepository()
	bookmarkRepo := repository.NewMockBookmarkRepository()

	userUC := usecase.NewUserUseCase(userRepo)
	postUC := usecase.NewPostUseCase(postRepo, tagRepo, userRepo)
	followUC := usecase.NewFollowUseCase(followRepo, userRepo)
	interactUC := usecase.NewInteractionUseCase(likeRepo, postRepo)
	bookmarkUC := usecase.NewBookmarkUseCase(bookmarkRepo, postRepo)

	userHandler := handler.NewUserHandler(userUC)
	postHandler := handler.NewPostHandler(postUC)
	followHandler := handler.NewFollowHandler(followUC)
	interactionHandler := handler.NewInteractionHandler(interactUC)
	bookmarkHandler := handler.NewBookmarkHandler(bookmarkUC)

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

			r.Post("/{id}/follow", followHandler.Follow)
			r.Delete("/{id}/follow", followHandler.Unfollow)
			r.Get("/{id}/followers", followHandler.GetFollowers)
			r.Get("/{id}/following", followHandler.GetFollowing)
		})

		r.Route("/posts", func(r chi.Router) {
			r.Post("/", postHandler.Create)
			r.Get("/", postHandler.List)
			r.Get("/{id}", postHandler.GetByID)
			r.Get("/slug/{slug}", postHandler.GetBySlug)
			r.Put("/{id}", postHandler.Update)
			r.Delete("/{id}", postHandler.Delete)

			r.Post("/{id}/like", interactionHandler.Like)
			r.Delete("/{id}/like", interactionHandler.Unlike)
			r.Get("/{id}/likes", interactionHandler.GetLikeCount)

			r.Post("/{id}/bookmark", bookmarkHandler.Bookmark)
			r.Delete("/{id}/bookmark", bookmarkHandler.Unbookmark)
			r.Get("/me/bookmarks", bookmarkHandler.GetUserBookmarks)
		})

		r.Route("/me", func(r chi.Router) {
			r.Get("/bookmarks", bookmarkHandler.GetUserBookmarks)
			r.Get("/following", followHandler.GetMyFollowing)
		})
	})

	addr := fmt.Sprintf(":%s", cfg.ServerPort)
	log.Printf("server running on %s", addr)
	if err := http.ListenAndServe(addr, r); err != nil {
		log.Fatal(err)
	}
}
