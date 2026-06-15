'use client';

import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { ANIMATION_CONFIG } from '@/config';

export const AnimatedChevron = () => {
  return (
    <motion.div
      animate={{
        y: [0, -4, 0], // Subtle up and down motion
      }}
      transition={{
        duration: ANIMATION_CONFIG.durations.chevron,
        ease: ANIMATION_CONFIG.easing.default,
        repeat: Infinity,
        repeatType: 'loop',
      }}
      className="text-gray-600 mb-1.5"
    >
      <ChevronUp size={16} />
    </motion.div>
  );
};