import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../store';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useStore();
  const getLinkStyle = ({ isActive }: { isActive: boolean }) => {
    return {
      color: isActive ? 'var(--color-gold)' : 'var(--color-light-gray)',
      borderBottom: isActive ? '2px solid var(--color-gold)' : 'none',
      paddingBottom: '0.5rem',
    };
  };

  return (
    <header className="bg-charcoal/80 backdrop-blur-lg sticky top-0 z-50 border-b border-gold/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-wider uppercase">
          <NavLink to="/" className="text-white hover:text-gold transition-colors">Fight <span className="text-gold">Companion</span></NavLink>
        </h1>
        <nav>
          <ul className="flex space-x-8 text-lg font-semibold items-center">
            <li><NavLink to="/" style={getLinkStyle} className="hover:text-gold transition-colors">Home</NavLink></li>
            <li><NavLink to="/fighters" style={getLinkStyle} className="hover:text-gold transition-colors">Fighters</NavLink></li>
            <li><NavLink to="/favorites" style={getLinkStyle} className="hover:text-gold transition-colors">Favorites</NavLink></li>
            <li><NavLink to="/events" style={getLinkStyle} className="hover:text-gold transition-colors">Events</NavLink></li>
            <li><NavLink to="/news" style={getLinkStyle} className="hover:text-gold transition-colors">News</NavLink></li>
            {isAuthenticated ? (
              <>
                <li className="text-white">{user?.name}</li>
                <li><button onClick={logout} className="bg-gold text-charcoal font-bold py-2 px-4 rounded-lg uppercase">Logout</button></li>
              </>
            ) : (
              <li><NavLink to="/login" className="bg-gold text-charcoal font-bold py-2 px-4 rounded-lg uppercase">Login</NavLink></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
