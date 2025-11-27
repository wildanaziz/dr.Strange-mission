import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as api from '../services/api';
import type { User, LoginData, SignupData } from '../services/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}
//Create context with undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      // Check if we have a token stored
      const token = api.getToken();
      const storedUser = api.getStoredUser();

      if (token && storedUser) {
        try {
          // Call /api/me
          const currentUser = await api.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.log('Token expired or invalid, logging out');
          api.removeToken();
          api.removeStoredUser();
          setUser(null);
        }
      }

      setIsLoading(false);
    }

    checkAuth();
  }, []);

  // Login function
  const login = async (data: LoginData): Promise<void> => {
    const response = await api.login(data);
    setUser(response.user);
  };

  // Signup function
  const signup = async (data: SignupData): Promise<void> => {
    const response = await api.signup(data);
    setUser(response.user);
  };

  // Logout function
  const logout = async (): Promise<void> => {
    await api.logout();
    setUser(null);
  };

  // Context value
  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
