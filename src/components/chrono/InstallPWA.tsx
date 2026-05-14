"use client";

import React, { useState, useEffect } from 'react';
import { Download, Monitor, Smartphone, X, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface InstallPWAProps {
  variant?: 'button' | 'banner';
}

export function InstallPWA({ variant = 'button' }: InstallPWAProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstallable(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }

    // We've used the prompt, and can't use it again
    setDeferredPrompt(null);
  };

  if (!isInstallable || !isVisible) return null;

  if (variant === 'banner') {
    return (
      <div className="w-full bg-primary/20 backdrop-blur-md border-b border-primary/30 p-4 animate-in slide-in-from-top duration-500 relative z-[60]">
        <div className="container max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-widest text-white">Install Camly Engine</span>
              <span className="text-[10px] font-bold text-white/60 hidden sm:inline">Unlock deep work synchronization for your device.</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleInstallClick}
              className="bg-primary text-white font-black text-[10px] uppercase tracking-widest px-6 h-10 rounded-xl shadow-xl hover:scale-105 transition-all"
            >
              Install Now
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsVisible(false)}
              className="w-10 h-10 rounded-full text-white/40 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <Button 
        onClick={handleInstallClick}
        variant="outline"
        className="w-full h-10 border-accent/20 bg-accent/5 hover:bg-accent/10 text-accent text-[9px] font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 transition-all group"
      >
        <Download className="w-3.5 h-3.5 group-hover:bounce" />
        Install Engine
      </Button>
      <div className="flex items-center justify-center gap-4 opacity-40">
        <Monitor className="w-3 h-3" />
        <Smartphone className="w-3 h-3" />
        <span className="text-[8px] font-bold uppercase tracking-widest">Cross-Platform Sync</span>
      </div>
    </div>
  );
}
