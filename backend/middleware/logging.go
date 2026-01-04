package middleware

import (
	"net/http"
	"time"

	"pasti-pintar/backend/utils"
)

// responseWriter wraps http.ResponseWriter to capture status code
type responseWriter struct {
	http.ResponseWriter
	statusCode int
	written    int64
}

func newResponseWriter(w http.ResponseWriter) *responseWriter {
	return &responseWriter{
		ResponseWriter: w,
		statusCode:     http.StatusOK,
	}
}

func (rw *responseWriter) WriteHeader(code int) {
	rw.statusCode = code
	rw.ResponseWriter.WriteHeader(code)
}

func (rw *responseWriter) Write(b []byte) (int, error) {
	n, err := rw.ResponseWriter.Write(b)
	rw.written += int64(n)
	return n, err
}

// LoggingMiddleware logs all HTTP requests with structured logging
func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		// Wrap response writer to capture status code
		wrapped := newResponseWriter(w)

		// Get request ID from context
		requestID := GetRequestID(r)

		// Process request
		next.ServeHTTP(wrapped, r)

		// Calculate duration
		duration := time.Since(start)

		// Log request details
		fields := map[string]interface{}{
			"request_id":    requestID,
			"method":        r.Method,
			"path":          r.URL.Path,
			"query":         r.URL.RawQuery,
			"status":        wrapped.statusCode,
			"duration_ms":   duration.Milliseconds(),
			"bytes_written": wrapped.written,
			"ip":            getIPAddress(r),
			"user_agent":    r.UserAgent(),
		}

		// Log at appropriate level based on status code
		if wrapped.statusCode >= 500 {
			utils.LogError(nil, "HTTP request completed with server error", fields)
		} else if wrapped.statusCode >= 400 {
			utils.LogWarn("HTTP request completed with client error", fields)
		} else {
			utils.LogInfo("HTTP request completed", fields)
		}
	})
}
