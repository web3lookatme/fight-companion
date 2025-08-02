import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Fighter } from '../../types';
import FighterCard from './FighterCard';
import { motion } from 'framer-motion';

interface FighterCarouselProps {
  fighters: Fighter[];
}

const FighterCarousel: React.FC<FighterCarouselProps> = ({ fighters }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="py-8"
      >
        {fighters.map((fighter) => (
          <SwiperSlide key={fighter.id}>
            <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}>
              <FighterCard fighter={fighter} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default FighterCarousel;
