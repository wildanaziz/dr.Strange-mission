package utils

import (
	"io"
	"os"
	"time"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

var Logger zerolog.Logger

// InitLogger initializes the structured logger
func InitLogger() {
	// Set up pretty logging for development
	if os.Getenv("APP_ENV") == "development" {
		log.Logger = log.Output(zerolog.ConsoleWriter{
			Out:        os.Stdout,
			TimeFormat: time.RFC3339,
		})
	} else {
		// JSON logging for production
		zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
		log.Logger = zerolog.New(os.Stdout).With().Timestamp().Logger()
	}

	// Set log level
	logLevel := os.Getenv("LOG_LEVEL")
	switch logLevel {
	case "debug":
		zerolog.SetGlobalLevel(zerolog.DebugLevel)
	case "warn":
		zerolog.SetGlobalLevel(zerolog.WarnLevel)
	case "error":
		zerolog.SetGlobalLevel(zerolog.ErrorLevel)
	default:
		zerolog.SetGlobalLevel(zerolog.InfoLevel)
	}

	Logger = log.Logger
}

// GetLogger returns the logger instance
func GetLogger() zerolog.Logger {
	return Logger
}

// LogError logs an error with context
func LogError(err error, msg string, fields map[string]interface{}) {
	event := Logger.Error().Err(err)
	for k, v := range fields {
		event = event.Interface(k, v)
	}
	event.Msg(msg)
}

// LogInfo logs an info message with context
func LogInfo(msg string, fields map[string]interface{}) {
	event := Logger.Info()
	for k, v := range fields {
		event = event.Interface(k, v)
	}
	event.Msg(msg)
}

// LogWarn logs a warning with context
func LogWarn(msg string, fields map[string]interface{}) {
	event := Logger.Warn()
	for k, v := range fields {
		event = event.Interface(k, v)
	}
	event.Msg(msg)
}

// LogDebug logs a debug message with context
func LogDebug(msg string, fields map[string]interface{}) {
	event := Logger.Debug()
	for k, v := range fields {
		event = event.Interface(k, v)
	}
	event.Msg(msg)
}

// NewLogWriter creates a writer that writes to the logger at info level
// Useful for middleware that requires an io.Writer
func NewLogWriter() io.Writer {
	return Logger
}
