import React from 'react';
import type { Fighter } from '../../types';

interface FighterTaleOfTheTapeProps {
  fighter: Fighter;
}

const FighterTaleOfTheTape: React.FC<FighterTaleOfTheTapeProps> = ({ fighter }) => {
  return (
    <div className="bg-charcoal p-8 rounded-lg shadow-xl">
      <h2 className="text-4xl text-gold font-bold border-b-2 border-gold/20 pb-3 mb-6 uppercase tracking-widest">Tale of the Tape</h2>
      <div className="space-y-4 text-lg">
        <div className="flex justify-between"><span className="text-medium-gray font-semibold">Weight Class</span><span className="text-white font-bold">{fighter.weight_class}</span></div>
        <div className="flex justify-between"><span className="text-medium-gray font-semibold">Nationality</span><span className="text-white font-bold">{fighter.nationality}</span></div>
        <div className="flex justify-between"><span className="text-medium-gray font-semibold">Height</span><span className="text-white font-bold">{fighter.stats.height}</span></div>
        <div className="flex justify-between"><span className="text-medium-gray font-semibold">Weight</span><span className="text-white font-bold">{fighter.stats.weight}</span></div>
        <div className="flex justify-between"><span className="text-medium-gray font-semibold">Reach</span><span className="text-white font-bold">{fighter.stats.reach}</span></div>
        <div className="flex justify-between"><span className="text-medium-gray font-semibold">Style</span><span className="text-white font-bold">{fighter.stats.style}</span></div>
      </div>
    </div>
  );
};

export default FighterTaleOfTheTape;
