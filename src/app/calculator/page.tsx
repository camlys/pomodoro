
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CalculatorRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
       <div className="animate-pulse text-[10px] font-black uppercase tracking-[0.5em] text-primary">
         Redirecting to Core Engine...
       </div>
    </div>
  );
}
