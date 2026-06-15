'use client';

import { Suspense } from 'react';
import Chat from '@/components/features/chat/chat';

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement du chat...</div>}>
      <Chat />
    </Suspense>
  );
}