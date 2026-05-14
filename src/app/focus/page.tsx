
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FocusRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#ba4949] flex items-center justify-center">
    </div>
  );
}
