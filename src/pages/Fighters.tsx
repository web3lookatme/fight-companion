import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from '../store';
import type { Fighter } from '../types';
import FighterCard from '../components/fighters/FighterCard';
import FighterCardSkeleton from '../components/fighters/FighterCardSkeleton';
import AnimatedPage from '../components/motion/AnimatedPage';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Fighters: React.FC = () => {
  const { fighters, loading, error, fetchFighters } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [weightClass, setWeightClass] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    if (fighters.length === 0) {
      fetchFighters();
    }
  }, [fighters.length, fetchFighters]);

  const sortedAndFilteredFighters = useMemo(() => {
    return fighters
      .filter(fighter => 
        fighter.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(fighter => 
        weightClass ? fighter.weight_class === weightClass : true
      )
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'wins') {
          return b.record.wins - a.record.wins;
        }
        return 0;
      });
  }, [fighters, searchTerm, weightClass, sortBy]);

  const weightClasses = useMemo(() => {
    const classes = new Set(fighters.map(f => f.weight_class));
    return Array.from(classes);
  }, [fighters]);

  return (
    <AnimatedPage>
      <div>
        <h1 className="text-6xl text-white tracking-wider mb-4 uppercase font-bold">All <span className="text-gold">Fighters</span></h1>
        <p className="text-lg text-medium-gray mb-8">Browse through the complete roster of elite fighters.</p>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-12">
          <input
            type="text"
            placeholder="Search by name..."
            className="bg-charcoal border border-gold/50 text-white text-lg rounded-lg p-3 w-full"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="bg-charcoal border border-gold/50 text-white text-lg rounded-lg p-3 w-full md:w-1/3"
            onChange={(e) => setWeightClass(e.target.value)}
          >
            <option value="">All Weight Classes</option>
            {weightClasses.map(wc => <option key={wc} value={wc}>{wc}</option>)}
          </select>
          <select
            className="bg-charcoal border border-gold/50 text-white text-lg rounded-lg p-3 w-full md:w-1/3"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="wins">Sort by Wins</option>
          </select>
        </div>

        {error && <p className="text-center text-red-500">{error}</p>}
        {!error && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <FighterCardSkeleton key={index} />
              ))
            ) : (
              sortedAndFilteredFighters.length > 0 ? (
                sortedAndFilteredFighters.map((fighter: Fighter) => (
                  <motion.div key={fighter.id} variants={itemVariants}>
                    <FighterCard fighter={fighter} />
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-lg text-medium-gray col-span-full">No fighters found matching your criteria.</p>
              )
            )}
          </motion.div>
        )}
      </div>
    </AnimatedPage>
  );
};

export default Fighters;
