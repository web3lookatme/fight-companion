import React from 'react';
import type { Fighter, FightHistory } from '../../types';

interface FighterFightHistoryProps {
  fighter: Fighter;
}

const FighterFightHistory: React.FC<FighterFightHistoryProps> = ({ fighter }) => {
  if (!fighter.fight_history || fighter.fight_history.length === 0) {
    return null;
  }

  return (
    <div className="bg-charcoal p-8 rounded-lg shadow-xl">
      <h2 className="text-4xl text-gold font-bold border-b-2 border-gold/20 pb-3 mb-6 uppercase tracking-widest">Fight History</h2>
      <ul className="space-y-4">
        {fighter.fight_history.map((fight: FightHistory, index: number) => (
          <li key={index} className={`p-4 rounded-lg flex justify-between items-center ${fight.result === 'Win' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
            <div><p className="font-bold text-white text-xl">vs {fight.opponent}</p><p className="text-medium-gray text-sm">{fight.event}</p></div>
            <p className={`font-bold text-2xl ${fight.result === 'Win' ? 'text-green-400' : 'text-red-400'}`}>{fight.result}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FighterFightHistory;
