/**
 * Development utilities for cache management and debugging
 * Only included in development builds
 */

export const DevUtils = {
  /**
   * Clear client-side caches and force reload
   */
  clearClientCache: () => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      // Clear various browser caches
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            caches.delete(cacheName);
          });
        });
      }
      
      // Clear local storage related to Next.js
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('next-') || key.startsWith('__next')) {
          localStorage.removeItem(key);
        }
      });
      
      // Clear session storage
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith('next-') || key.startsWith('__next')) {
          sessionStorage.removeItem(key);
        }
      });
      
      console.log('[DevUtils] Client caches cleared');
    }
  },

  /**
   * Force reload the page with cache busting
   */
  forceReload: () => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      window.location.reload();
    }
  },

  /**
   * Add cache busting to URLs in development
   */
  bustCache: (url: string): string => {
    if (process.env.NODE_ENV === 'development') {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}_cb=${Date.now()}`;
    }
    return url;
  },

  /**
   * Log cache debugging information
   */
  debugCache: () => {
    if (process.env.NODE_ENV === 'development') {
      console.group('[DevUtils] Cache Debug Info');
      console.log('User Agent:', navigator.userAgent);
      console.log('Cache Storage Available:', 'caches' in window);
      console.log('Local Storage Keys:', Object.keys(localStorage));
      console.log('Session Storage Keys:', Object.keys(sessionStorage));
      console.groupEnd();
    }
  },

  /**
   * Initialize development cache management
   */
  init: () => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      // Add global dev utilities
      (window as any).__devUtils = DevUtils;
      
      // Add keyboard shortcuts for cache management
      document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Shift + R: Clear cache and reload
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'R') {
          e.preventDefault();
          DevUtils.clearClientCache();
          setTimeout(() => DevUtils.forceReload(), 500);
        }
        
        // Ctrl/Cmd + Shift + D: Debug cache
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
          e.preventDefault();
          DevUtils.debugCache();
        }

        // Ctrl/Cmd + Shift + C: Clear cache without reload
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
          e.preventDefault();
          DevUtils.clearClientCache();
          console.log('[DevUtils] Cache cleared manually');
        }
      });
      
      // Auto-clear cache on page visibility change (tab switching)
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
          // Page became visible, check for stale cache
          const lastClear = localStorage.getItem('__dev_last_cache_clear');
          const now = Date.now();
          const fiveMinutes = 5 * 60 * 1000;
          
          if (!lastClear || (now - parseInt(lastClear)) > fiveMinutes) {
            DevUtils.clearClientCache();
            localStorage.setItem('__dev_last_cache_clear', now.toString());
          }
        }
      });
      
      console.log('[DevUtils] Development utilities initialized');
      console.log('[DevUtils] Shortcuts: Ctrl/Cmd+Shift+R (clear+reload), Ctrl/Cmd+Shift+D (debug), Ctrl/Cmd+Shift+C (clear only)');
    }
  },

  /**
   * Check if cache clearing is needed based on timestamp
   */
  shouldClearCache: (): boolean => {
    if (process.env.NODE_ENV !== 'development') return false;
    
    const lastClear = localStorage.getItem('__dev_last_cache_clear');
    if (!lastClear) return true;
    
    const now = Date.now();
    const thirtyMinutes = 30 * 60 * 1000;
    
    return (now - parseInt(lastClear)) > thirtyMinutes;
  },

  /**
   * Performance monitor for development
   */
  monitorPerformance: () => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            console.log('[DevUtils] Navigation timing:', {
              loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
              domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
              firstPaint: navEntry.responseEnd - navEntry.requestStart,
            });
          }
        }
      });
      
      observer.observe({ entryTypes: ['navigation'] });
    }
  }
};

// Auto-initialize in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  DevUtils.init();
  DevUtils.monitorPerformance();
  
  // Check if immediate cache clear is needed
  if (DevUtils.shouldClearCache()) {
    DevUtils.clearClientCache();
  }
}