import React, { useEffect } from 'react';
import { useStore } from '../store';
import FighterCard from '../components/fighters/FighterCard';
import AnimatedPage from '../components/motion/AnimatedPage';
import { motion } from 'framer-motion';
import Spinner from '../components/ui/Spinner';

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

const Favorites: React.FC = () => {
  const { fighters, favoriteFighterIds, loading, error, fetchFighters } = useStore();

  useEffect(() => {
    if (fighters.length === 0) {
      fetchFighters();
    }
  }, [fighters.length, fetchFighters]);

  const favoriteFighters = fighters.filter(f => favoriteFighterIds.includes(f.id));

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <AnimatedPage>
      <div>
        <h1 className="text-6xl text-white tracking-wider mb-4 uppercase font-bold">Favorite <span className="text-gold">Fighters</span></h1>
        <p className="text-lg text-medium-gray mb-12">Your handpicked roster of top fighters.</p>
        
        {favoriteFighters.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {favoriteFighters.map(fighter => (
              <motion.div key={fighter.id} variants={itemVariants}>
                <FighterCard fighter={fighter} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-lg text-medium-gray">You haven't favorited any fighters yet.</p>
        )}
      </div>
    </AnimatedPage>
  );
};

export default Favorites;
