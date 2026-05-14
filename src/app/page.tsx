
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect root to Focus Engine as the new primary tool
    router.replace('/focus');
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20 animate-pulse">
        Initializing Camly Engine...
      </div>
    </div>
  );
}
