import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Info, Calendar, Zap } from 'lucide-react';
import logo from '../assets/Surajit.ai.png'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Book Session', path: '/BookASession', icon: Calendar, special: true }
  ];

  return (
    <nav className={`fixed md:4 top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)]' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
        <div className="flex-shrink-0">
  <a href="/" className="flex items-center gap-2 group">
    <div className="w-10 h-10 rounded-lg overflow-hidden transform group-hover:scale-110 transition-all duration-300">
      <img
        src={logo}
        alt="Surajit.AI Logo"
        className="w-full h-full object-contain"
      />
    </div>

    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
      Surajit.AI
    </span>
  </a>
</div>


          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return link.special ? (
                <a
                  key={link.name}
                  href={link.path}
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg font-semibold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center gap-2"
                >
                  <Icon size={18} />
                  {link.name}
                </a>
              ) : (
                <a
                  key={link.name}
                  href={link.path}
                  className="px-4 py-2 text-gray-300 hover:text-cyan-400 rounded-lg hover:bg-zinc-800/50 transition-all flex items-center gap-2 font-medium"
                >
                  <Icon size={18} />
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-zinc-800/50 transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-4 py-4 space-y-2 bg-zinc-900/95 backdrop-blur-xl border-t border-cyan-500/20">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.path}
                onClick={closeMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  link.special
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-zinc-800/50'
                }`}
              >
                <Icon size={20} />
                {link.name}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;