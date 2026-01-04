package middleware

import (
	"context"
	"net/http"

	"github.com/google/uuid"
)

type contextKey string

const RequestIDKey contextKey = "request_id"

func RequestID(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requestID := r.Header.Get("X-Request-ID")

		if requestID == "" {
			requestID = uuid.New().String()
		}

		w.Header().Set("X-Request-ID", requestID)
		ctx := context.WithValue(r.Context(), RequestIDKey, requestID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func GetRequestID(r *http.Request) string {
	if reqID := r.Context().Value(RequestIDKey); reqID != nil {
		return reqID.(string)
	}
	return ""
}

func GetRequestIDFromContext(ctx context.Context) string {
	if reqID := ctx.Value(RequestIDKey); reqID != nil {
		return reqID.(string)
	}
	return ""
}
