import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-secondary-dark/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* 1. Mobile Toggle (Hamburger) - Placed First to appear on LEFT in Mobile View */}
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

        {/* 2. Logo - Placed Second to appear on RIGHT in Mobile View (due to justify-between) */}
        {/* On Desktop, since button is hidden, this becomes the first visible element (Left) */}
        <a href="#" className="flex items-center gap-3 group order-2">
          <img
            src="/assets/PASTI PINTAR NEW-02-02.png"
            alt="Pasti Pintar Logo"
            className="w-20 h-20 object-contain transform group-hover:scale-110 transition-transform"
          />
          <div className="flex flex-col leading-none">
            {/* Text visible on Mobile/Tablet, HIDDEN on Desktop (md:hidden) */}
            <span className="text-lg font-extrabold tracking-tight text-white md:hidden">
              PastiPintar
            </span>
          </div>
        </a>

        {/* 3. Desktop Menu - Placed Third to appear on RIGHT in Desktop View */}
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
            <button className="border-2 border-primary text-white px-8 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:bg-gradient-to-r hover:from-primary hover:to-primary-hover hover:border-transparent hover:shadow-lg hover:shadow-primary/40">
                Login
            </button>
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
          <button className="w-full bg-transparent border-2 border-primary text-white py-3 rounded-full font-bold hover:bg-gradient-to-r hover:from-primary hover:to-primary-hover hover:border-transparent transition-all">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;