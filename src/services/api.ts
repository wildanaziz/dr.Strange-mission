// Base URL for API
const API_BASE_URL = 'http://localhost:8080/api';

export interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  provider: string;
  email_verified: boolean;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

export interface SignupData {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('token');
};

export const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

export const setStoredUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeStoredUser = (): void => {
  localStorage.removeItem('user');
};

/** 
@param endpoint
@param options
@returns
**/

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Parse response body
    const data = await response.json();

    // Check if request was successful
    if (!response.ok) {
      throw new Error(data.message || 'Terjadi kesalahan');
    }

    return data as T;
  } catch (error) {

    // Handle network errors
    if (error instanceof TypeError) {
      throw new Error('Tidak dapat terhubung ke server. Pastikan backend sedang berjalan.');
    }
    throw error;
  }
}

// Auth API Functions
export async function signup(data: SignupData): Promise<AuthResponse> {
  const response = await apiRequest<AuthResponse>('/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  // Store token and user after successful signup
  setToken(response.token);
  setStoredUser(response.user);

  return response;
}

export async function login(data: LoginData): Promise<AuthResponse> {
  const response = await apiRequest<AuthResponse>('/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  // Store token and user after successful login
  setToken(response.token);
  setStoredUser(response.user);

  return response;
}

export async function forgotPassword(email: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>('/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(
  token: string,
  password: string,
  confirmPassword: string
): Promise<{ message: string }> {
  return apiRequest<{ message: string }>('/reset-password', {
    method: 'POST',
    body: JSON.stringify({ 
      token, 
      password, 
      confirm_password: confirmPassword 
    }),
  });
}

export async function getCurrentUser(): Promise<User> {
  return apiRequest<User>('/me');
}

export async function logout(): Promise<void> {
  try {
    await apiRequest<{ message: string }>('/logout', {
      method: 'POST',
    });
  } finally {
    // Always clear local storage
    removeToken();
    removeStoredUser();
  }
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function getGoogleAuthUrl(): string {
  return `${API_BASE_URL}/auth/google`;
}
