'use client';

import { questions, questionConfig } from '@/data/questions';
import { useNavigation } from './useNavigation';

export const useQuestions = () => {
  const { goToChat } = useNavigation();

  const handleQuestionClick = (questionKey: string) => {
    const question = questions[questionKey as keyof typeof questions];
    if (question) {
      goToChat(question);
    }
  };

  const handleDirectQuestionClick = (question: string) => {
    goToChat(question);
  };

  const getQuestionByKey = (key: string) => {
    return questions[key as keyof typeof questions];
  };

  const getQuestionConfig = () => {
    return questionConfig;
  };

  const getVisibleQuestions = (excludeMenu = true) => {
    return excludeMenu 
      ? questionConfig.filter(config => !config.isMenu)
      : questionConfig;
  };

  return {
    questions,
    questionConfig,
    handleQuestionClick,
    handleDirectQuestionClick,
    getQuestionByKey,
    getQuestionConfig,
    getVisibleQuestions,
  };
};