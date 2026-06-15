'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useNavigation = () => {
  const router = useRouter();

  const goToChat = useCallback((query: string) => {
    router.push(`/chat?query=${encodeURIComponent(query)}`);
  }, [router]);

  const goToHome = useCallback(() => {
    router.push('/');
  }, [router]);

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    goToChat,
    goToHome,
    goBack,
    router,
  };
};