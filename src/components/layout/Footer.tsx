import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal border-t border-gold/10 py-8 mt-24">
      <div className="container mx-auto px-6 text-center text-medium-gray">
        <p className="font-semibold uppercase tracking-wider">&copy; 2025 Fight <span className="text-gold">Companion</span>. All Rights Reserved.</p>
        <p className="text-sm font-sans mt-2 uppercase tracking-widest">The Ultimate Destination for Fight Fans.</p>
      </div>
    </footer>
  );
};

export default Footer;