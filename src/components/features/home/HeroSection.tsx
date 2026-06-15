'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAnimation } from '@/hooks/useAnimation';
import { APP_CONFIG } from '@/config';

export const HeroSection = () => {
  const { heroAnimationVariants } = useAnimation();

  return (
    <>
      {/* Header */}
      <motion.div
        className="z-1 mt-28 mb-8 flex flex-col items-center text-center md:mt-4 md:mb-12"
        variants={heroAnimationVariants.topElement}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-secondary-foreground mt-1 text-3xl font-semibold md:text-4xl lg:text-5xl">
          Hi! I'm <span className="font-bold">{APP_CONFIG.author.nickname}</span> 👋
        </h2>
        <div className="mt-4 max-w-2xl">
          <h1 className="text-lg font-medium leading-relaxed text-gray-700 dark:text-gray-300 sm:text-xl md:text-2xl text-center">
            Welcome to My Portfolio ⚡ Load-balanced between technical depth and human charm!
          </h1>
        </div>
      </motion.div>

      {/* Center Avatar */}
      <div className="relative z-10 h-52 w-48 overflow-hidden rounded-full sm:h-72 sm:w-72">
        <Image
          src={APP_CONFIG.assets.avatar.main}
          alt={`${APP_CONFIG.author.name} Avatar`}
          width={400}
          height={400}
          priority
          className="object-cover w-full h-full"
        />
      </div>
    </>
  );
};