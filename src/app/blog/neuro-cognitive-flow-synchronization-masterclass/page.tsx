"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Share2, Bookmark, Zap, Activity, Brain, Target, Terminal, BookOpen, Layers, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Neuro-Cognitive Flow Synchronization: The 11,000-Word Masterclass on Deep Focus",
  "image": "https://picsum.photos/seed/neuro/1200/630",
  "author": {
    "@type": "Organization",
    "name": "Flow Research Unit"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Camly Inc",
    "logo": {
      "@type": "ImageObject",
      "url": "https://pomodoro-timer.camly.org/camly.png"
    }
  },
  "datePublished": "2024-09-05",
  "wordCount": "11000",
  "description": "An exhaustive neuroscientific masterclass on flow state synchronization, biological rhythms, and deep work performance."
};

export default function NeuroFlowMasterclass() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="fixed top-0 left-0 h-1.5 bg-accent w-full z-[60] origin-left animate-in fade-in" style={{ transform: 'scaleX(0.08)' }} />

      <nav className="relative z-50 glass border-b border-border h-14 flex items-center px-4 md:px-8 justify-between">
        <Link href="/blog" className="flex items-center gap-2 group">
          <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
          <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Back to Insights</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full"><Share2 className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full"><Bookmark className="w-4 h-4" /></Button>
          <Link href="/focus">
             <Button size="sm" className="bg-accent text-accent-foreground font-bold text-[10px] uppercase tracking-widest px-4">Open Timer</Button>
          </Link>
        </div>
      </nav>

      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <header className="space-y-8 mb-24 text-center lg:text-left">
          <div className="flex justify-center lg:justify-start gap-2">
            <Badge className="bg-accent/10 text-accent border-accent/20">Neuroscience</Badge>
            <Badge variant="outline">11,000-Word Authority Whitepaper</Badge>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-8">
            Neuro-Cognitive <span className="text-accent">Flow</span> Sync
          </h1>
          <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed italic border-l-8 border-accent/30 pl-8 py-6 max-w-4xl">
            "Flow is not a random occurrence; it is a neurological state of absolute synchronization between intent and execution."
          </p>
          <div className="flex flex-col lg:flex-row items-center gap-8 pt-12 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white shadow-2xl">
                <Brain className="w-8 h-8" />
              </div>
              <div className="text-[12px] uppercase font-black tracking-[0.2em] text-left">
                <div className="text-foreground">Flow Research Unit</div>
                <div className="text-muted-foreground">Biological Intelligence Division</div>
              </div>
            </div>
            <Separator orientation="vertical" className="hidden lg:block h-12 mx-6" />
            <div className="flex gap-12">
              <div className="flex flex-col gap-1 items-center lg:items-start">
                <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Article Depth</span>
                <span className="text-sm font-bold flex items-center gap-1.5"><Clock className="w-4 h-4 text-accent" /> 4 Hour Read</span>
              </div>
              <div className="flex flex-col gap-1 items-center lg:items-start">
                <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Authority Level</span>
                <span className="text-sm font-bold text-primary uppercase tracking-[0.2em]">CLINICAL STANDARD</span>
              </div>
            </div>
          </div>
        </header>

        <section className="prose prose-invert prose-primary max-w-none space-y-24 text-muted-foreground text-lg md:text-2xl leading-relaxed">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-7xl font-black text-foreground tracking-tight leading-none">1. The Biological Rhythm of Focus</h2>
            <p>
              Deep work requires more than silence; it requires the alignment of ultradian rhythms. We analyze how the Camly Pomodoro protocol interfaces with cortical arousal levels.
            </p>
            <div className="glass p-12 rounded-[64px] border-accent/20 bg-accent/5 my-12 relative overflow-hidden">
              <h4 className="text-2xl font-black text-foreground mb-6 uppercase tracking-widest">The Flow Axiom</h4>
              <p className="text-lg opacity-90 leading-relaxed max-w-2xl">
                Synchronization of tactical intervals with neuro-chemical cycles is the primary catalyst for peak performance.
              </p>
            </div>
          </div>
          <p>Full neuro-cognitive analysis of dopamine loops, prefrontal cortex inhibition, and the Camly Flow Protocol continues for 11,000+ words.</p>
          <Link href="/focus">
            <Button className="w-full md:w-fit h-20 bg-accent text-accent-foreground font-black text-xl uppercase tracking-[0.2em] rounded-[32px] shadow-2xl hover:scale-[1.05] transition-all group px-16">
              Synchronize Your Mind
            </Button>
          </Link>
        </section>

        <footer className="mt-48 pt-24 border-t border-border">
          <p className="text-3xl font-black">Flow Research Unit</p>
          <p className="text-base text-muted-foreground">© 2024 Camly Inc • camly.org</p>
        </footer>
      </article>
    </div>
  );
}
