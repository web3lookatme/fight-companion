import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Fighter } from '../../types';

interface FighterCardProps {
  fighter: Fighter;
}

const FighterCard: React.FC<FighterCardProps> = ({ fighter }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="h-full"
    >
      <Link to={`/fighters/${fighter.id}`} className="group block bg-charcoal rounded-lg overflow-hidden shadow-lg hover:shadow-gold/20 transition-shadow duration-300 h-full">
        <div className="relative">
          <img
            src={fighter.image}
            alt={fighter.name}
            className={`w-full h-64 object-cover ${
              fighter.name === 'Khabib Nurmagomedov' ? 'object-top' : ''
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <h2 className="text-3xl font-bold text-white uppercase tracking-wider">{fighter.name}</h2>
            <p className="text-lg text-gold">"{fighter.nickname}"</p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-medium-gray font-semibold">Record</span>
            <span className="text-white font-bold text-lg">{fighter.record.wins}-{fighter.record.losses}-{fighter.record.draws}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-medium-gray font-semibold">Weight Class</span>
            <span className="text-white font-bold text-lg">{fighter.weight_class}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FighterCard;
