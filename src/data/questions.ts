/**
 * Centralized question data store
 * Contains all question configurations, categories, and related data
 * Eliminates duplication between components
 */

import {
  Award,
  BriefcaseBusiness,
  BriefcaseIcon,
  CircleEllipsis,
  GraduationCapIcon,
  Layers,
  Mail,
  MailIcon,
  UserRoundSearch,
  UserSearch,
} from 'lucide-react';

import type { QuestionMap, QuestionConfig, QuestionCategory } from '@/types';
import { UI_CONFIG } from '@/config';

// Core question mappings - used by quick action buttons
export const questions: QuestionMap = {
  About: 'Tell me about your background and who you are.',
  Experience: 'Show me your professional experience and career journey.',
  Projects: 'Show me your data engineering projects.',
  Skills: 'What are your technical skills and expertise in data engineering and AI?',
  Contact: 'How can I reach out to discuss data engineering opportunities?',
} as const;

// Question configuration for UI rendering with colors and icons
export const questionConfig: readonly QuestionConfig[] = [
  { key: 'About', color: UI_CONFIG.colors.about, icon: UserRoundSearch },
  { key: 'Experience', color: UI_CONFIG.colors.experience, icon: Award },
  { key: 'Projects', color: UI_CONFIG.colors.projects, icon: BriefcaseBusiness },
  { key: 'Skills', color: UI_CONFIG.colors.skills, icon: Layers },
  { key: 'Contact', color: UI_CONFIG.colors.contact, icon: Mail },
  { key: '', color: UI_CONFIG.colors.menu, icon: CircleEllipsis, isMenu: true },
] as const;

// Special highlighted questions (shown with special styling in drawers)
export const specialQuestions: readonly string[] = [
  'Who are you?',
  'Can I see your resume?',
  'What are your skills?',
  'How can I reach you?',
] as const;

// Categorized questions for the expanded drawer menu
export const questionsByCategory: readonly QuestionCategory[] = [
  {
    id: 'me',
    name: 'Me',
    icon: UserSearch,
    questions: [
      'Who are you?',
      'What are your passions?',
      'How did you get started in tech?',
      'Where do you see yourself in 5 years?',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: BriefcaseIcon,
    questions: [
      'Can I see your resume?',
      'What makes you a valuable team member?',
      'Where are you working now?',
      'Why should I hire you?',
      "What's your educational background?",
    ],
  },
  {
    id: 'skills',
    name: 'Skills',
    icon: GraduationCapIcon,
    questions: [
      'What are your skills?',
      'How was your experience at Amazon Games?',
    ],
  },
  {
    id: 'contact',
    name: 'Contact & Future',
    icon: MailIcon,
    questions: [
      'How can I reach you?',
      "What kind of project would make you say 'yes' immediately?",
      'Where are you located?',
    ],
  },
] as const;

// Quick access functions for common operations
export const getQuestionByKey = (key: keyof QuestionMap): string => {
  return questions[key];
};

export const getQuestionConfig = (key: string): QuestionConfig | undefined => {
  return questionConfig.find(config => config.key === key);
};

export const isSpecialQuestion = (question: string): boolean => {
  return specialQuestions.includes(question);
};

export const getQuestionsByCategory = (categoryId: string): string[] => {
  const category = questionsByCategory.find(cat => cat.id === categoryId);
  return category ? [...category.questions] : [];
};

export const getAllQuestions = (): string[] => {
  const allQuestions = new Set<string>();
  
  // Add main questions
  Object.values(questions).forEach(q => allQuestions.add(q));
  
  // Add categorized questions
  questionsByCategory.forEach(category => {
    category.questions.forEach(q => allQuestions.add(q));
  });
  
  return Array.from(allQuestions);
};

// Export individual collections for backward compatibility and specific use cases
export { questions as QUESTIONS };
export { questionConfig as QUESTION_CONFIG };
export { specialQuestions as SPECIAL_QUESTIONS };
export { questionsByCategory as QUESTIONS_BY_CATEGORY };

// Default export for convenience
export default {
  questions,
  questionConfig,
  specialQuestions,
  questionsByCategory,
  // Utility functions
  getQuestionByKey,
  getQuestionConfig,
  isSpecialQuestion,
  getQuestionsByCategory,
  getAllQuestions,
} as const;