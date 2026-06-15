/**
 * Animation Utilities
 * 
 * Centralized animation configurations and utilities for consistent motion
 * throughout the application using Framer Motion.
 */

import { Variants, Transition } from 'framer-motion';

/**
 * Common easing functions for consistent motion feel
 */
export const easing = {
  easeInOut: [0.4, 0, 0.2, 1] as number[],
  easeOut: [0, 0, 0.2, 1] as number[],
  easeIn: [0.4, 0, 1, 1] as number[],
  bounce: [0.68, -0.55, 0.265, 1.55] as number[],
  spring: [0.175, 0.885, 0.32, 1.275] as number[],
};

/**
 * Common duration values for consistent timing
 */
export const duration = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
} as const;

/**
 * Standard fade animation variants
 */
export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Slide up animation variants
 */
export const slideUpVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

/**
 * Slide down animation variants
 */
export const slideDownVariants: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

/**
 * Slide left animation variants
 */
export const slideLeftVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

/**
 * Slide right animation variants
 */
export const slideRightVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

/**
 * Scale animation variants
 */
export const scaleVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

/**
 * Bounce scale animation variants
 */
export const bounceScaleVariants: Variants = {
  initial: { opacity: 0, scale: 0.3 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  exit: { opacity: 0, scale: 0.3 },
};

/**
 * Standard motion config for basic animations
 */
export const motionConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: {
    duration: duration.normal,
  },
} as const;

/**
 * Spring transition configuration
 */
export const springTransition: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
};

/**
 * Smooth transition configuration
 */
export const smoothTransition: Transition = {
  duration: duration.normal,
  ease: easing.easeInOut as [number, number, number, number],
};

/**
 * Fast transition configuration
 */
export const fastTransition: Transition = {
  duration: duration.fast,
  ease: easing.easeOut as [number, number, number, number],
};

/**
 * Slow transition configuration
 */
export const slowTransition: Transition = {
  duration: duration.slow,
  ease: easing.easeInOut as [number, number, number, number],
};

/**
 * Creates a staggered animation for child elements
 * 
 * @param staggerDelay - Delay between each child animation
 * @param delayChildren - Initial delay before starting children animations
 * @returns Variants object for parent container
 */
export const createStaggerVariants = (
  staggerDelay: number = 0.1,
  delayChildren: number = 0
): Variants => ({
  initial: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
  animate: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
  exit: {
    transition: {
      staggerChildren: staggerDelay,
      staggerDirection: -1,
    },
  },
});

/**
 * Creates a staggered slide up animation
 * 
 * @param staggerDelay - Delay between each child animation
 * @returns Variants object for staggered slide up animation
 */
export const createStaggerSlideUp = (staggerDelay: number = 0.1): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

/**
 * Pulsing animation for loading states or attention-grabbing elements
 */
export const pulseVariants: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.7, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easing.easeInOut as [number, number, number, number],
    },
  },
};

/**
 * Floating animation for subtle movement
 */
export const floatVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easing.easeInOut as [number, number, number, number],
    },
  },
};

/**
 * Hover scale animation
 */
export const hoverScaleVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: fastTransition,
  },
  tap: { 
    scale: 0.95,
    transition: fastTransition,
  },
};

/**
 * Creates a custom transition with specified duration and easing
 * 
 * @param customDuration - Animation duration
 * @param customEasing - Easing function
 * @returns Transition object
 */
export const createTransition = (
  customDuration: number = duration.normal,
  customEasing: [number, number, number, number] = easing.easeInOut as [number, number, number, number]
): Transition => ({
  duration: customDuration,
  ease: customEasing,
});

/**
 * Creates a delay transition
 * 
 * @param delay - Delay in seconds
 * @param customDuration - Animation duration
 * @returns Transition object
 */
export const createDelayedTransition = (
  delay: number,
  customDuration: number = duration.normal
): Transition => ({
  duration: customDuration,
  delay,
  ease: easing.easeInOut as [number, number, number, number],
});

/**
 * Container variants for page-level animations
 */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.easeOut as [number, number, number, number],
    },
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: duration.normal,
      ease: easing.easeIn as [number, number, number, number],
    },
  },
};

/**
 * Modal/overlay animation variants
 */
export const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: springTransition,
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    y: 20,
    transition: smoothTransition,
  },
};

/**
 * Backdrop animation variants
 */
export const backdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: duration.normal },
  },
  exit: { 
    opacity: 0,
    transition: { duration: duration.normal },
  },
};

/**
 * Card hover animation
 */
export const cardHoverVariants: Variants = {
  initial: { y: 0 },
  hover: { 
    y: -5,
    transition: {
      duration: duration.fast,
      ease: easing.easeOut as [number, number, number, number],
    },
  },
};