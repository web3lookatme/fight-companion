import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store';
import type { Fighter } from '../types';
import { AnimatePresence, motion } from 'framer-motion';

import AnimatedPage from '../components/motion/AnimatedPage';
import Spinner from '../components/ui/Spinner';
import FighterTaleOfTheTape from '../components/fighters/FighterTaleOfTheTape';
import FighterFightHistory from '../components/fighters/FighterFightHistory';
import FighterRadarChart from '../components/fighters/FighterRadarChart';
import ComparisonBarChart from '../components/fighters/ComparisonBarChart';

const FighterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fighters, favoriteFighterIds, toggleFavorite, fetchFighters, fetchFighterById, loading, error } = useStore();
  const [fighter, setFighter] = useState<Fighter | null>(null);
  const [opponent, setOpponent] = useState<Fighter | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const currentFighter = await fetchFighterById(id);
        setFighter(currentFighter || null);
      }
      if (fighters.length === 0) {
        fetchFighters();
      }
    };
    loadData();
  }, [id, fetchFighterById, fighters.length, fetchFighters]);

  const handleOpponentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const opponentId = parseInt(e.target.value);
    const selectedOpponent = fighters.find(f => f.id === opponentId) || null;
    setOpponent(selectedOpponent);
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!fighter) return <div className="text-white text-center text-4xl py-20">Fighter not found.</div>;

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="relative bg-charcoal p-8 rounded-lg shadow-2xl shadow-black/40 overflow-hidden mb-12">
          <div className="absolute inset-0">
            <img src={fighter.image} alt={fighter.name} className={`w-full h-full object-cover opacity-10 ${fighter.name === 'Khabib Nurmagomedov' ? 'object-top' : 'object-center'}`} />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal to-transparent"></div>
          </div>
          <div className="relative flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0">
              <img src={fighter.image} alt={fighter.name} className={`w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-8 border-gold shadow-lg ${fighter.name === 'Khabib Nurmagomedov' ? 'object-top' : ''}`} />
            </div>
            <div className="md:ml-8 mt-6 md:mt-0 text-center md:text-left">
              <h1 className="text-6xl md:text-8xl font-bold text-white uppercase tracking-wider">{fighter.name}</h1>
              <p className="text-3xl text-gold">"{fighter.nickname}"</p>
              <div className="mt-4 flex items-center">
                <div className="bg-onyx/50 rounded-lg px-6 py-3 inline-block">
                  <p className="text-white text-4xl font-bold tracking-wider">{fighter.record.wins}W - {fighter.record.losses}L - {fighter.record.draws}D</p>
                </div>
                <button
                  onClick={() => toggleFavorite(fighter.id, fighter.name)}
                  className={`ml-4 text-white py-3 px-5 rounded-lg transition-colors ${
                    favoriteFighterIds.includes(fighter.id) ? 'bg-gold text-charcoal' : 'bg-gray-700 hover:bg-gold hover:text-charcoal'
                  }`}
                >
                  {favoriteFighterIds.includes(fighter.id) ? '★' : '☆'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-12">
            <FighterTaleOfTheTape fighter={fighter} />
            <div className="bg-charcoal p-8 rounded-lg shadow-xl">
              <h2 className="text-4xl text-gold font-bold border-b-2 border-gold/20 pb-3 mb-6 uppercase tracking-widest">Head-to-Head</h2>
              <select onChange={handleOpponentSelect} className="bg-onyx border border-gold/50 text-white text-lg rounded-lg p-3 w-full focus:ring-2 focus:ring-gold focus:outline-none">
                <option value="">Select Opponent</option>
                {fighters.filter((f: Fighter) => f.id !== fighter.id).map((f: Fighter) => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-12">
            <AnimatePresence mode="wait">
              {opponent ? (
                <motion.div key="comparison" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <div className="bg-charcoal rounded-lg shadow-2xl shadow-black/40 p-8">
                    <div className="text-center mb-6">
                      <h2 className="text-4xl text-gold font-bold border-b-2 border-gold/20 pb-3 mb-6 uppercase tracking-widest">Head-to-Head</h2>
                      <p className="text-3xl text-white uppercase font-bold">{fighter.name} <span className="text-gold">VS</span> {opponent.name}</p>
                    </div>
                    <ComparisonBarChart fighter1={fighter} fighter2={opponent} />
                  </div>
                </motion.div>
              ) : (
                <motion.div key="details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-12">
                  {fighter.attributes && fighter.attributes.length > 0 && (
                    <div className="bg-charcoal p-8 rounded-lg shadow-xl">
                      <h2 className="text-4xl text-gold font-bold border-b-2 border-gold/20 pb-3 mb-6 uppercase tracking-widest">Attributes</h2>
                      <FighterRadarChart attributes={fighter.attributes} />
                    </div>
                  )}
                  <FighterFightHistory fighter={fighter} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default FighterDetail;
