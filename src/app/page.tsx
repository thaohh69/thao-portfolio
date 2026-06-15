'use client';

import FluidCursor from '@/components/shared/FluidCursor';
import { GithubButton } from '@/components/ui/github-button';
import VisitCounter from '@/components/ui/visit-counter';
import { SiMedium } from 'react-icons/si';
import { useEffect } from 'react';
import { HeroSection } from '@/components/features/home/HeroSection';
import { QuestionGrid } from '@/components/features/home/QuestionGrid';
import { useNavigation } from '@/hooks/useNavigation';
import { ANIMATION_CONFIG, APP_CONFIG } from '@/config';

/* ---------- component ---------- */
export default function Home() {
  const { goToChat } = useNavigation();

  useEffect(() => {
    // Preload chat assets in background
    const img = new window.Image();
    img.src = APP_CONFIG.assets.memojis.static;

    // Preload videos
    const linkWebm = document.createElement('link');
    linkWebm.rel = 'preload';
    linkWebm.as = 'video';
    linkWebm.href = APP_CONFIG.assets.memojis.webm;
    document.head.appendChild(linkWebm);

    const linkMp4 = document.createElement('link');
    linkMp4.rel = 'prefetch';
    linkMp4.as = 'video';
    linkMp4.href = APP_CONFIG.assets.memojis.mp4;
    document.head.appendChild(linkMp4);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10 md:pb-20" style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)' }}>
      {/* Visit Counter - Top of page */}
      <div className="absolute top-14 left-1/2 transform -translate-x-1/2 z-30 sm:top-4">
        <VisitCounter className="scale-75 sm:scale-100" />
      </div>

      {/* big blurred footer word */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
        <div
          className="hidden bg-gradient-to-b from-neutral-500/20 to-neutral-500/5 bg-clip-text text-[10rem] leading-none font-black text-transparent select-none sm:block lg:text-[16rem]"
          style={{ marginBottom: '-2.5rem' }}
        >
          thaoho
        </div>
      </div>

      {/* Hiring Button - Left side */}
      <div className="absolute top-4 left-2 z-20 sm:top-6 sm:left-6">
        <button
          onClick={() => goToChat('Are you open to new data engineering opportunities?')}
          className="relative flex cursor-pointer items-center gap-1 rounded-full border bg-white/30 px-2 py-1 text-xs font-medium text-black shadow-md backdrop-blur-lg transition hover:bg-white/60 dark:border-white dark:text-white dark:hover:bg-neutral-800 sm:gap-2 sm:px-4 sm:py-1.5 sm:text-sm"
        >
          {/* Green pulse dot */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          Hiring Data Engineers?
        </button>
      </div>

      {/* Blog and GitHub buttons - Right side */}
      <div className="absolute top-4 right-2 z-20 flex items-center gap-1 sm:top-6 sm:right-8 sm:gap-2">
      
        
        <GithubButton
          animationDuration={ANIMATION_CONFIG.durations.chevron}
          label="Star"
          size={'sm'}
          repoUrl={APP_CONFIG.author.portfolio}
        />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Question Grid */}
      <QuestionGrid />
      
      <FluidCursor />
    </div>
  );
}
