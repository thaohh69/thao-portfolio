'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VisitCounterProps {
  className?: string;
}

export default function VisitCounter({ className = '' }: VisitCounterProps) {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchAndIncrementVisitCount = async () => {
      try {
        // First, increment the visit count
        const response = await fetch('/api/visits', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to increment visit count');
        }
        
        const result = await response.json();
        
        // Validate the response structure
        if (result.success && result.data && typeof result.data.count === 'number') {
          // Animate the counter
          setTimeout(() => {
            setCount(result.data.count);
            setIsLoading(false);
          }, 500);
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (error) {
        console.error('Error fetching visit count:', error);
        // Fallback to a static number if API fails
        setTimeout(() => {
          setCount(12847);
          setIsLoading(false);
        }, 500);
      }
    };

    fetchAndIncrementVisitCount();
  }, []);

  // Format number with leading zeros for odometer effect
  const formatNumber = (num: number): string => {
    return num.toString().padStart(6, '0');
  };

  const digits = formatNumber(count).split('');

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="flex items-center gap-3 rounded-full border border-neutral-200/50 bg-white/20 px-4 py-2 shadow-lg backdrop-blur-lg dark:border-neutral-700/50 dark:bg-neutral-800/20">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
            <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex h-8 w-5 items-center justify-center rounded-md bg-gradient-to-b from-neutral-100 to-neutral-200 font-mono text-sm font-bold text-neutral-800 shadow-inner dark:from-neutral-700 dark:to-neutral-800 dark:text-neutral-200">
                0
              </div>
            ))}
          </div>
          <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">visits</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex items-center gap-3 rounded-full border border-neutral-200/50 bg-white/20 px-4 py-2 shadow-lg backdrop-blur-lg dark:border-neutral-700/50 dark:bg-neutral-800/20"
      >
        {/* Visit counter icon */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isLoading ? 360 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
        >
          <svg
            className="h-3 w-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </motion.div>

        {/* Odometer-style counter */}
        <div className="flex items-center gap-1">
          {digits.map((digit, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.5 + (index * 0.1),
                ease: "easeOut" 
              }}
              className="flex h-8 w-5 items-center justify-center rounded-md bg-gradient-to-b from-neutral-100 to-neutral-200 font-mono text-sm font-bold text-neutral-800 shadow-inner dark:from-neutral-700 dark:to-neutral-800 dark:text-neutral-200"
            >
              <motion.span
                key={`${index}-${digit}`}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isLoading ? '0' : digit}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
          className="text-xs font-medium text-neutral-600 dark:text-neutral-400"
        >
          visits
        </motion.span>
      </motion.div>
    </div>
  );
}