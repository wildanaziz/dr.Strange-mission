import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { NAV_LINKS } from '../../constants';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-secondary-dark/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* Mobile Toggle (Hamburger)*/}
        <button
          className="md:hidden text-white focus:outline-none order-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X />
          ) : (
            <Menu />
          )}
        </button>

        {/*Logo Section - Placed Second */}
        <a href="#" className="flex items-center gap-3 group order-2">
          <img
            src="/assets/PASTI PINTAR NEW-02-02.png"
            alt="Pasti Pintar Logo"
            className="w-20 h-20 object-contain transform group-hover:scale-110 transition-transform"
          />
          <div className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight text-white md:hidden">
              PastiPintar
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center space-x-2 order-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-5 py-2 rounded-full text-sm font-bold text-white transition-all duration-300 hover:bg-accent hover:shadow-[0_0_20px_rgba(247,180,0,0.5)]"
            >
              {link.name}
            </a>
          ))}
          <div className="pl-4">
            {isLoading ? (
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 text-white hover:bg-white/10 px-3 py-2 rounded-full transition-all"
                >
                  {user.avatar_url ? (
                    <img 
                      src={user.avatar_url} 
                      alt={user.full_name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <span className="text-sm font-medium max-w-[120px] truncate">
                    {user.full_name || user.email.split('@')[0]}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.full_name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login"
                className="border-2 border-primary text-white px-8 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:bg-gradient-to-r hover:from-primary hover:to-primary-hover hover:border-transparent hover:shadow-lg hover:shadow-primary/40"
              >
                Login
              </Link>
            )}
          </div>
        </div>

      </div>

      {/* Mobile Menu Dropdown with Smooth Transition */}
      <div 
        className={`
          md:hidden absolute top-full left-0 right-0 
          bg-secondary-dark border-t border-white/10 shadow-xl p-4 
          flex flex-col space-y-4 
          transition-all duration-300 ease-in-out origin-top
          ${isOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto visible' 
            : 'opacity-0 -translate-y-5 pointer-events-none invisible'
          }
        `}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-white/90 font-bold hover:text-white hover:bg-accent hover:shadow-[0_0_15px_rgba(247,180,0,0.4)] px-4 py-2 rounded-lg transition-all"
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </a>
        ))}
        <div className="pt-2 border-t border-white/10">
          {isAuthenticated && user ? (
            <>
              <div className="flex items-center gap-3 px-4 py-3 mb-2">
                {user.avatar_url ? (
                  <img 
                    src={user.avatar_url} 
                    alt={user.full_name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{user.full_name}</p>
                  <p className="text-white/60 text-sm truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-red-500/20 text-red-400 py-3 rounded-full font-bold hover:bg-red-500/30 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login"
              className="block w-full text-center bg-transparent border-2 border-primary text-white py-3 rounded-full font-bold hover:bg-gradient-to-r hover:from-primary hover:to-primary-hover hover:border-transparent transition-all"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;