import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  CircleEllipsis,
} from 'lucide-react';
import { useState } from 'react';
import { Drawer } from 'vaul';

// Import shared components
import { QuestionButton } from '@/components/ui/shared/QuestionButton';
import { AnimatedChevron } from '@/components/ui/shared/AnimatedChevron';
import { MenuDrawer } from '@/components/ui/shared/MenuDrawer';

// Import hooks
import { useQuestions } from '@/hooks/useQuestions';

interface HelperBoostProps {
  submitQuery?: (query: string) => void;
}

export default function HelperBoost({
  submitQuery,
}: HelperBoostProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const { getVisibleQuestions, getQuestionByKey } = useQuestions();

  const handleQuestionClick = (questionKey: string) => {
    if (submitQuery) {
      const question = getQuestionByKey(questionKey);
      if (question) {
        submitQuery(question);
      }
    }
  };

  const handleDrawerQuestionClick = (question: string) => {
    if (submitQuery) {
      submitQuery(question);
    }
    setOpen(false);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <div className="w-full">
          {/* Toggle Button */}
          <div
            className={
              isVisible
                ? 'mb-2 flex justify-center'
                : 'mb-0 flex justify-center'
            }
          >
            <button
              onClick={toggleVisibility}
              className="flex items-center gap-1 px-3 py-1 text-xs text-gray-500 transition-colors hover:text-gray-700"
            >
              {isVisible ? (
                <>
                  <ChevronDown size={14} />
                  Hide quick questions
                </>
              ) : (
                <>
                  <ChevronUp size={14} />
                  Show quick questions
                </>
              )}
            </button>
          </div>

          {/* HelperBoost Content */}
          {isVisible && (
            <div className="w-full">
              <div
                className="flex w-full gap-2 md:gap-3 justify-center flex-wrap"
              >
                {getVisibleQuestions().map(({ key, color, icon }) => (
                  <QuestionButton
                    key={key}
                    onClick={() => handleQuestionClick(key)}
                    icon={icon}
                    color={color}
                    label={key}
                    variant="chat"
                  />
                ))}

                {/* Need Inspiration Button */}
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Drawer.Trigger className="group relative flex flex-shrink-0 items-center justify-center">
                        <motion.div
                          className="hover:bg-border/30 flex h-auto cursor-pointer items-center space-x-1 rounded-xl border border-neutral-200 bg-white/80 px-3 py-3 text-sm backdrop-blur-sm transition-all duration-200 dark:border-neutral-800 dark:bg-neutral-900 flex-shrink-0"
                          whileHover={{ scale: 1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-2 text-gray-700">
                            <CircleEllipsis
                              className="h-[16px] w-[16px]"
                              strokeWidth={2}
                            />
                          </div>
                        </motion.div>
                      </Drawer.Trigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <AnimatedChevron />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Content */}
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-100 bg-black/60 backdrop-blur-xs" />
          <Drawer.Content className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-100 mt-24 flex h-[80%] w-full max-w-md mx-4 flex-col rounded-t-[10px] bg-gray-100 outline-none lg:h-[60%]">
            <MenuDrawer
              isOpen={true}
              onClose={() => setOpen(false)}
              onQuestionClick={handleDrawerQuestionClick}
              variant="drawer"
            />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
