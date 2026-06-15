'use client';

import { Drawer } from 'vaul';
import { Separator } from '@/components/ui/separator';
import { QuestionItem } from './QuestionItem';
import { specialQuestions } from '@/data/questions';

export interface CategorySectionProps {
  name: string;
  Icon: React.ElementType;
  questions: readonly string[];
  onQuestionClick: (question: string) => void;
  variant?: 'default' | 'drawer';
}

export const CategorySection = ({
  name,
  Icon,
  questions,
  onQuestionClick,
  variant = 'default',
}: CategorySectionProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2.5 px-1">
        <Icon className="h-5 w-5" />
        {variant === 'drawer' ? (
          <Drawer.Title className="text-[22px] font-medium text-gray-900">
            {name}
          </Drawer.Title>
        ) : (
          <h3 className="text-[22px] font-medium text-gray-900">
            {name}
          </h3>
        )}
      </div>

      {variant === 'drawer' ? (
        <Separator className="my-4" />
      ) : (
        <div className="my-4 h-px bg-gray-200" />
      )}

      <div className="space-y-3">
        {questions.map((question, index) => (
          <QuestionItem
            key={index}
            question={question}
            onClick={() => onQuestionClick(question)}
            isSpecial={specialQuestions.includes(question)}
          />
        ))}
      </div>
    </div>
  );
};