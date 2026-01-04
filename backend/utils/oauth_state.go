package utils

import (
	"crypto/rand"
	"encoding/base64"
	"sync"
	"time"
)

// OAuthStateManager manages OAuth state tokens
type OAuthStateManager struct {
	states map[string]*StateInfo
	mu     sync.RWMutex
}

// StateInfo holds OAuth state information
type StateInfo struct {
	State     string
	CreatedAt time.Time
	ExpiresAt time.Time
}

var stateManager *OAuthStateManager

// InitOAuthStateManager initializes the OAuth state manager
func InitOAuthStateManager() {
	stateManager = &OAuthStateManager{
		states: make(map[string]*StateInfo),
	}

	// Start cleanup goroutine
	go stateManager.cleanupExpiredStates()
}

// GetOAuthStateManager returns the singleton instance
func GetOAuthStateManager() *OAuthStateManager {
	if stateManager == nil {
		InitOAuthStateManager()
	}
	return stateManager
}

// GenerateState generates a new random state token
func (m *OAuthStateManager) GenerateState() (string, error) {
	b := make([]byte, 32)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}

	state := base64.URLEncoding.EncodeToString(b)

	m.mu.Lock()
	defer m.mu.Unlock()

	m.states[state] = &StateInfo{
		State:     state,
		CreatedAt: time.Now(),
		ExpiresAt: time.Now().Add(10 * time.Minute), // 10 minutes expiry
	}

	return state, nil
}

// ValidateState checks if a state token is valid and removes it
func (m *OAuthStateManager) ValidateState(state string) bool {
	m.mu.Lock()
	defer m.mu.Unlock()

	info, exists := m.states[state]
	if !exists {
		return false
	}

	// Check if expired
	if time.Now().After(info.ExpiresAt) {
		delete(m.states, state)
		return false
	}

	// Remove state after validation (single-use)
	delete(m.states, state)
	return true
}

// cleanupExpiredStates removes expired states periodically
func (m *OAuthStateManager) cleanupExpiredStates() {
	ticker := time.NewTicker(5 * time.Minute)
	defer ticker.Stop()

	for range ticker.C {
		m.mu.Lock()
		now := time.Now()
		for state, info := range m.states {
			if now.After(info.ExpiresAt) {
				delete(m.states, state)
			}
		}
		m.mu.Unlock()
	}
}

// GetStateCount returns the number of active states (for monitoring)
func (m *OAuthStateManager) GetStateCount() int {
	m.mu.RLock()
	defer m.mu.RUnlock()
	return len(m.states)
}
