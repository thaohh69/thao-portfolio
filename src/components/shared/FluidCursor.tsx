'use client';
import { useEffect, useRef } from 'react';

import initFluidCursor from '@/hooks/use-FluidCursor';

const FluidCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Set the canvas id for the hook to access
      canvasRef.current.id = 'fluid';
      
      // Initialize the fluid cursor effect after a small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        try {
          initFluidCursor();
        } catch (error) {
          console.error('Failed to initialize fluid cursor:', error);
        }
      }, 100);

      // Cleanup function
      return () => {
        clearTimeout(timer);
      };
    }
    // Return empty cleanup function if canvas is not available
    return () => {};
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <canvas 
        ref={canvasRef}
        id="fluid" 
        className="absolute inset-0 h-full w-full pointer-events-none" 
        style={{ 
          width: '100vw', 
          height: '100vh',
          display: 'block',
          zIndex: 1,
          opacity: 0.8,
          background: 'transparent'
        }}
      />
    </div>
  );
};
export default FluidCursor;
