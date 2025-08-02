import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../store';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? 'var(--color-gold)' : 'var(--color-light-gray)',
  });

  const navLinks = (
    <>
      <li><NavLink to="/" style={getLinkStyle} className="hover:text-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Home</NavLink></li>
      <li><NavLink to="/fighters" style={getLinkStyle} className="hover:text-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Fighters</NavLink></li>
      <li><NavLink to="/favorites" style={getLinkStyle} className="hover:text-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Favorites</NavLink></li>
      <li><NavLink to="/events" style={getLinkStyle} className="hover:text-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Events</NavLink></li>
      <li><NavLink to="/news" style={getLinkStyle} className="hover:text-gold transition-colors" onClick={() => setIsMenuOpen(false)}>News</NavLink></li>
    </>
  );

  return (
    <header className="bg-charcoal/80 backdrop-blur-lg sticky top-0 z-50 border-b border-gold/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wider uppercase">
          <NavLink to="/" className="text-white hover:text-gold transition-colors">Fight <span className="text-gold">Companion</span></NavLink>
        </h1>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-lg font-semibold">
          <ul className="flex space-x-8">{navLinks}</ul>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-white font-semibold">{user?.name}</span>
              <button onClick={logout} className="bg-gold text-charcoal font-bold py-2 px-4 rounded-lg uppercase text-sm">Logout</button>
            </div>
          ) : (
            <NavLink to="/login" className="bg-gold text-charcoal font-bold py-2 px-4 rounded-lg uppercase text-sm">Login</NavLink>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-charcoal border-t border-gold/10"
          >
            <nav className="container mx-auto px-6 py-4">
              <ul className="flex flex-col space-y-4 text-lg font-semibold items-center">
                {navLinks}
                <li className="pt-4 w-full">
                  {isAuthenticated ? (
                    <div className="flex flex-col items-center space-y-4">
                      <span className="text-white font-semibold">{user?.name}</span>
                      <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full bg-gold text-charcoal font-bold py-3 rounded-lg uppercase">Logout</button>
                    </div>
                  ) : (
                    <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-gold text-charcoal font-bold py-3 rounded-lg uppercase">Login</NavLink>
                  )}
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
