import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navLinks = [
    { name: 'Try Out', href: '/dashboard' },
    { name: 'Hasil', href: '/hasil' },
    { name: 'Beli Paket', href: '/beli-paket' },
    { name: 'Jejaring Pintar', href: '/jejaring' },
  ];

  const isActive = (href: string) => location.pathname === href;

  // Get user initials for fallback avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/assets/PASTI PINTAR NEW-02-01.png"
              alt="Pasti Pintar"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`font-medium px-6 py-2 rounded-full transition-colors ${
                  isActive(link.href)
                    ? 'text-white bg-primary'
                    : 'text-neutral-text hover:text-primary hover:bg-primary-light'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Profile with Avatar */}
          <Link
            to="/profile"
            className="hidden md:flex w-10 h-10 rounded-full border-2 border-primary items-center justify-center hover:bg-primary-light transition-colors overflow-hidden"
          >
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.full_name}
                className="w-full h-full object-cover"
              />
            ) : user?.full_name ? (
              <span className="text-sm font-bold text-primary">
                {getInitials(user.full_name)}
              </span>
            ) : (
              <User className="w-5 h-5 text-primary" />
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-neutral-text"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-neutral-border">
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-medium px-4 py-2 rounded-lg ${
                    isActive(link.href)
                      ? 'text-primary bg-primary-light'
                      : 'text-neutral-text hover:text-primary'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/profile"
                className="flex items-center gap-2 font-medium px-4 py-2 rounded-lg text-neutral-text hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.full_name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
                {user?.full_name || 'Profile'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DashboardNavbar;
