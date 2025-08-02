import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import type { News as NewsType } from '../types';
import AnimatedPage from '../components/motion/AnimatedPage';
import { motion } from 'framer-motion';
import NewsCardSkeleton from '../components/news/NewsCardSkeleton';

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

const News: React.FC = () => {
  const { news, loading, error, fetchNews } = useStore();

  useEffect(() => {
    if (news.length === 0) {
      fetchNews();
    }
  }, [news.length, fetchNews]);

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-6xl text-white tracking-wider mb-4 uppercase font-bold">Latest <span className="text-gold">News</span></h1>
        <p className="text-lg text-medium-gray mb-12">Your source for the latest happenings in the world of combat sports.</p>
        
        {error && <p className="text-center text-red-500">{error}</p>}
        {!error && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {loading && news.length === 0 ? (
              Array.from({ length: 3 }).map((_, index) => <NewsCardSkeleton key={index} />)
            ) : (
              news.map((article: NewsType) => (
                <motion.div key={article.id} variants={itemVariants}>
                  <Link to={`/news/${article.id}`} className="block bg-charcoal rounded-lg shadow-lg overflow-hidden group h-full">
                    <div className="relative">
                      <img src={article.image} alt={article.title} className="w-full h-56 object-cover"/>
                      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 h-24">{article.title}</h3>
                      <p className="text-medium-gray text-sm mb-4">{article.source} - {new Date(article.date).toLocaleDateString()}</p>
                      <p className="text-light-gray font-sans h-28 overflow-hidden">{article.summary}</p>
                      <span className="text-gold font-semibold mt-4 inline-block hover:underline">Read More &rarr;</span>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </AnimatedPage>
  );
};

export default News;