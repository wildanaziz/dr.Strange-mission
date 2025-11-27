import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { forgotPassword } from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
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
          <Link to="/" className="flex justify-center mb-4">
            <img
              src="/assets/PASTI PINTAR NEW-02-02.png"
              alt="Pasti Pintar Logo"
              className="w-16 h-16 object-contain"
            />
          </Link>
          
          {/* Welcome Text */}
          <h1 className="text-2xl font-extrabold text-white text-center mb-2">
            Lupa Password?
          </h1>
          <p className="text-white/70 text-center text-sm">
            Jangan khawatir, kami bantu reset
          </p>
        </div>
      </div>

      {/* Left Side - Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="/assets/hero-bg.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-secondary-dark/60"></div>
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-center">
          <Link to="/" className="mb-8">
            <img
              src="/assets/PASTI PINTAR NEW-02-02.png"
              alt="Pasti Pintar Logo"
              className="w-32 h-32 object-contain"
            />
          </Link>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Lupa Password?
          </h1>
          <p className="text-lg text-white/80 max-w-md">
            Jangan khawatir! Masukkan email kamu dan kami akan mengirimkan link untuk reset password.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 bg-neutral-bg flex-1 rounded-t-3xl lg:rounded-none -mt-4 lg:mt-0 relative z-10">
        <Link to="/" className="hidden lg:block mb-8">
          <img
            src="/assets/PASTI PINTAR NEW-02-02.png"
            alt="Pasti Pintar Logo"
            className="w-24 h-24 object-contain"
          />
        </Link>

        <div className="w-full max-w-md">
          {/* Header - Hidden on Mobile */}
          <div className="hidden lg:block text-center mb-8">
            <h2 className="text-3xl font-extrabold text-secondary-dark mb-2">
              Reset Password
            </h2>
            <p className="text-neutral-text">
              Masukkan email yang terdaftar untuk menerima link reset password
            </p>
          </div>

          {!isSubmitted ? (
            <>
              {/* Forgot Password Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-secondary-dark mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-text/50" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Masukkan email kamu"
                      className="w-full pl-12 pr-4 py-3.5 border border-neutral-border rounded-xl bg-white text-neutral-text placeholder:text-neutral-text/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      required
                      disabled={isLoading}
                    />
                  </div>
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
                      Mengirim...
                    </>
                  ) : (
                    'Kirim Link Reset'
                  )}
                </button>
              </form>

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
                Email Terkirim!
              </h3>
              <p className="text-neutral-text mb-6">
                Kami telah mengirimkan link reset password ke{' '}
                <span className="font-semibold text-secondary-dark">{email}</span>
              </p>
              <p className="text-sm text-neutral-text/70 mb-8">
                Tidak menerima email? Cek folder spam atau{' '}
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary font-medium hover:text-primary-hover"
                >
                  kirim ulang
                </button>
              </p>
              
              {/* Back to Login */}
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 text-sm text-neutral-text hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Halaman Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
