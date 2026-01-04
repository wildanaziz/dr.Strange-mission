package utils

import (
	"sync"
	"time"
)

// TokenBlacklist manages invalidated JWT tokens
type TokenBlacklist struct {
	tokens map[string]time.Time // token -> expiration time
	mu     sync.RWMutex
}

var blacklist *TokenBlacklist

// InitTokenBlacklist initializes the token blacklist
func InitTokenBlacklist() {
	blacklist = &TokenBlacklist{
		tokens: make(map[string]time.Time),
	}

	// Start cleanup goroutine
	go blacklist.cleanupExpiredTokens()
}

// GetTokenBlacklist returns the singleton instance
func GetTokenBlacklist() *TokenBlacklist {
	if blacklist == nil {
		InitTokenBlacklist()
	}
	return blacklist
}

// Add adds a token to the blacklist with its expiration time
func (b *TokenBlacklist) Add(token string, expiresAt time.Time) {
	b.mu.Lock()
	defer b.mu.Unlock()

	b.tokens[token] = expiresAt
}

// IsBlacklisted checks if a token is blacklisted
func (b *TokenBlacklist) IsBlacklisted(token string) bool {
	b.mu.RLock()
	defer b.mu.RUnlock()

	expiresAt, exists := b.tokens[token]
	if !exists {
		return false
	}

	// If token has expired, it's no longer relevant
	if time.Now().After(expiresAt) {
		return false
	}

	return true
}

// Remove removes a token from the blacklist
func (b *TokenBlacklist) Remove(token string) {
	b.mu.Lock()
	defer b.mu.Unlock()

	delete(b.tokens, token)
}

// cleanupExpiredTokens removes expired tokens periodically
func (b *TokenBlacklist) cleanupExpiredTokens() {
	ticker := time.NewTicker(1 * time.Hour)
	defer ticker.Stop()

	for range ticker.C {
		b.mu.Lock()
		now := time.Now()
		for token, expiresAt := range b.tokens {
			if now.After(expiresAt) {
				delete(b.tokens, token)
			}
		}
		b.mu.Unlock()
	}
}

// GetBlacklistSize returns the number of blacklisted tokens (for monitoring)
func (b *TokenBlacklist) GetBlacklistSize() int {
	b.mu.RLock()
	defer b.mu.RUnlock()
	return len(b.tokens)
}

// Clear removes all tokens from the blacklist
func (b *TokenBlacklist) Clear() {
	b.mu.Lock()
	defer b.mu.Unlock()

	b.tokens = make(map[string]time.Time)
}
