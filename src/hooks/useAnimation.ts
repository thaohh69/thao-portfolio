'use client';

import { ANIMATION_CONFIG } from '@/config';

export const useAnimation = () => {
  const heroAnimationVariants = {
    topElement: {
      hidden: { opacity: 0, y: -60 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: ANIMATION_CONFIG.durations.long },
      },
    },
    bottomElement: {
      hidden: { opacity: 0, y: 80 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { 
          duration: ANIMATION_CONFIG.durations.long, 
          delay: ANIMATION_CONFIG.delays.hero 
        },
      },
    },
  };

  const springAnimation = {
    type: 'spring' as const,
    stiffness: ANIMATION_CONFIG.spring.stiffness,
    damping: ANIMATION_CONFIG.spring.damping,
  };

  const drawerAnimation = {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
    transition: { duration: ANIMATION_CONFIG.durations.medium, ease: 'easeOut' },
  };

  return {
    heroAnimationVariants,
    springAnimation,
    drawerAnimation,
    config: ANIMATION_CONFIG,
  };
};