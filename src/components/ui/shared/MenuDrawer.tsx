'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CategorySection } from './CategorySection';
import { questionsByCategory } from '@/data/questions';

export interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestionClick: (question: string) => void;
  variant?: 'modal' | 'drawer';
}

export const MenuDrawer = ({
  isOpen,
  onClose,
  onQuestionClick,
  variant = 'modal',
}: MenuDrawerProps) => {
  const handleQuestionClick = (question: string) => {
    onQuestionClick(question);
    onClose();
  };

  if (variant === 'modal') {
    return (
      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" 
            onClick={onClose}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full max-w-md h-[80%] bg-white rounded-t-[10px] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 overflow-y-auto p-4">
                <div className="mx-auto max-w-md space-y-4">
                  <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
                  <div className="mx-auto w-full max-w-md">
                    <div className="space-y-8 pb-16">
                      {questionsByCategory.map((category) => (
                        <CategorySection
                          key={category.id}
                          name={category.name}
                          Icon={category.icon}
                          questions={category.questions}
                          onQuestionClick={handleQuestionClick}
                          variant="default"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  // For drawer variant (used in HelperBoost), we'll return the content only
  // as the drawer wrapper is handled by the parent component
  return (
    <div className="flex-1 overflow-y-auto rounded-t-[10px] bg-white p-4">
      <div className="mx-auto max-w-md space-y-4">
        <div
          aria-hidden
          className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300"
        />
        <div className="mx-auto w-full max-w-md">
          <div className="space-y-8 pb-16">
            {questionsByCategory.map((category) => (
              <CategorySection
                key={category.id}
                name={category.name}
                Icon={category.icon}
                questions={category.questions}
                onQuestionClick={handleQuestionClick}
                variant="drawer"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};