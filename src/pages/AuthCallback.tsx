import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleCallback() {
      const token = searchParams.get('token');
      const errorParam = searchParams.get('error');

      // Check for error from backend
      if (errorParam) {
        setError(decodeURIComponent(errorParam));
        return;
      }

      // Check if token exists
      if (!token) {
        setError('No authentication token received');
        return;
      }

      try {
        // Store the token
        api.setToken(token);

        //Fetch user info with the token
        const user = await api.getCurrentUser();
        
        //Store user and update context
        api.setStoredUser(user);
        setUser(user);

        // Redirect to home page karena belom jadi dashbor e wkwk
        navigate('/', { replace: true });
      } catch (err) {
        console.error('Auth callback error:', err);
        setError('Failed to complete authentication');
        api.removeToken();
      }
    }

    handleCallback();
  }, [searchParams, navigate, setUser]);

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-bg">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-8 h-8 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Autentikasi Gagal
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    );
  }

  // Show loading state
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-bg">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        {/* Loading spinner */}
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          Memproses Login...
        </h1>
        <p className="text-gray-600">
          Mohon tunggu sebentar
        </p>
      </div>
    </div>
  );
}
