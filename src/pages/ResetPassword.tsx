import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, ArrowLeft, CheckCircle, Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { resetPassword } from '../services/api';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const token = searchParams.get('token');

  // Check if token exists
  useEffect(() => {
    if (!token) {
      setError('Token tidak valid. Silakan minta link reset password baru.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    if (!token) {
      setError('Token tidak valid');
      return;
    }

    setIsLoading(true);
    
    try {
      await resetPassword(token, password, confirmPassword);
      setIsSubmitted(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-dark flex flex-col lg:flex-row">
      {/* Mobile Header with Background */}
      <div className="lg:hidden relative">
        <img
          src="/assets/hero-bg.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-secondary-dark/70"></div>
        
        {/* Mobile Header Content */}
        <div className="relative z-10 px-6 pt-8 pb-6">
          {/* Logo */}
          <Link to="/" className="flex justify-center mb-4">
            <img
              src="/assets/PASTI PINTAR NEW-02-02.png"
              alt="Pasti Pintar Logo"
              className="w-16 h-16 object-contain"
            />
          </Link>
          
          <h1 className="text-2xl font-extrabold text-white text-center mb-2">
            Reset Password
          </h1>
          <p className="text-white/70 text-center text-sm">
            Buat password baru untuk akun kamu
          </p>
        </div>
      </div>

      {/* Left Side Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="/assets/hero-bg.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-secondary-dark/60"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-center">
          <Link to="/" className="mb-8">
            <img
              src="/assets/PASTI PINTAR NEW-02-02.png"
              alt="Pasti Pintar Logo"
              className="w-32 h-32 object-contain"
            />
          </Link>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Reset Password
          </h1>
          <p className="text-lg text-white/80 max-w-md">
            Buat password baru yang kuat untuk melindungi akun kamu.
          </p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 bg-neutral-bg flex-1 rounded-t-3xl lg:rounded-none -mt-4 lg:mt-0 relative z-10">
        {/* Desktop Logo Hidden on Mobile */}
        <Link to="/" className="hidden lg:block mb-8">
          <img
            src="/assets/PASTI PINTAR NEW-02-02.png"
            alt="Pasti Pintar Logo"
            className="w-24 h-24 object-contain"
          />
        </Link>

        <div className="w-full max-w-md">
          {/* Header Hidden on Mobile */}
          <div className="hidden lg:block text-center mb-8">
            <h2 className="text-3xl font-extrabold text-secondary-dark mb-2">
              Password Baru
            </h2>
            <p className="text-neutral-text">
              Masukkan password baru untuk akun kamu
            </p>
          </div>

          {!isSubmitted ? (
            <>
              {/* Invalid Token State */}
              {!token ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-dark mb-3">
                    Link Tidak Valid
                  </h3>
                  <p className="text-neutral-text mb-6">
                    Link reset password tidak valid atau sudah kadaluarsa.
                  </p>
                  
                  {/* Request New Link */}
                  <Link 
                    to="/forgot-password" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-hover transition-colors"
                  >
                    Minta Link Baru
                  </Link>
                </div>
              ) : (
                /* Reset Password Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  {/* Password Input */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-secondary-dark mb-2">
                      Password Baru
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-text/50" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Minimal 6 karakter"
                        className="w-full pl-12 pr-12 py-3.5 border border-neutral-border rounded-xl bg-white text-neutral-text placeholder:text-neutral-text/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        required
                        disabled={isLoading}
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-text/50 hover:text-neutral-text transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Input */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-secondary-dark mb-2">
                      Konfirmasi Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-text/50" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Ulangi password baru"
                        className="w-full pl-12 pr-12 py-3.5 border border-neutral-border rounded-xl bg-white text-neutral-text placeholder:text-neutral-text/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        required
                        disabled={isLoading}
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-text/50 hover:text-neutral-text transition-colors"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                    <p className="text-sm text-blue-700 font-medium mb-2">Password harus:</p>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li className={`flex items-center gap-2 ${password.length >= 6 ? 'text-green-600' : ''}`}>
                        <span>{password.length >= 6 ? '✓' : '•'}</span>
                        Minimal 6 karakter
                      </li>
                      <li className={`flex items-center gap-2 ${password === confirmPassword && password.length > 0 ? 'text-green-600' : ''}`}>
                        <span>{password === confirmPassword && password.length > 0 ? '✓' : '•'}</span>
                        Sama dengan konfirmasi password
                      </li>
                    </ul>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-lg disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </form>
              )}

              {/* Back to Login */}
              <div className="mt-8 text-center">
                <Link 
                  to="/login" 
                  className="inline-flex items-center gap-2 text-sm text-neutral-text hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Halaman Login
                </Link>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-dark mb-3">
                Password Berhasil Diubah!
              </h3>
              <p className="text-neutral-text mb-6">
                Password kamu sudah berhasil diubah. Kamu akan dialihkan ke halaman login dalam beberapa detik...
              </p>
              
              {/* Back to Login */}
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-hover transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Login Sekarang
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
