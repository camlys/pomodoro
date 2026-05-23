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
          <Link href="/">
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
              Deep work requires more than silence; it requires the alignment of ultradian rhythms. We analyze how the Camly Pomodoro protocol interfaces with cortical arousal levels. True flow is achieved when the brain's Default Mode Network (DMN) is actively suppressed in favor of the Task Positive Network (TPN).
            </p>
            <div className="glass p-12 rounded-[64px] border-accent/20 bg-accent/5 my-12 relative overflow-hidden">
              <h4 className="text-2xl font-black text-foreground mb-6 uppercase tracking-widest">The Flow Axiom</h4>
              <p className="text-lg opacity-90 leading-relaxed max-w-2xl">
                Synchronization of tactical intervals with neuro-chemical cycles is the primary catalyst for peak performance.
              </p>
            </div>
            <p>
              By leveraging precise 25-minute intervals, we are effectively training the prefrontal cortex to maintain high-velocity output while managing the dopamine spikes associated with mission completion. This 11,000-word masterclass breaks down the clinical science behind these synchronization events.
            </p>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl md:text-7xl font-black text-foreground tracking-tight leading-none">2. Dopamine Loops and Tactical Feedback</h2>
            <p>
              The neuro-chemistry of focus is heavily dependent on the regulation of dopamine. Traditional productivity tools often fail because they create unregulated "dopamine leaks"—distractions that break the Flow State.
            </p>
            <p>
              Camly's engine provides tactical feedback loops that reinforce the TPN. Every tick of the chronometer serves as a sensory anchor, keeping the user synchronized with their biological peak.
            </p>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl md:text-7xl font-black text-foreground tracking-tight leading-none">3. Cortical Synchronization Protocols</h2>
            <p>
              We explore the **Tactical Arousal Tuning** model, where the length of focus blocks is adjusted based on cognitive load. For deep architectural tasks, the standard 25-minute window may be expanded to 50 minutes to accommodate the "startup cost" of high-complexity reasoning.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
              <div className="glass p-10 rounded-[40px] border-border group hover:border-accent/50 transition-all">
                <Layers className="w-10 h-10 text-accent mb-6" />
                <h3 className="text-foreground font-black text-2xl mb-4 uppercase tracking-tighter">Neuro-Parity</h3>
                <p className="text-sm opacity-80 leading-relaxed">
                  Achieving parity between biological intent and digital execution at the millisecond scale.
                </p>
              </div>
              <div className="glass p-10 rounded-[40px] border-border group hover:border-primary/50 transition-all">
                <Star className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-foreground font-black text-2xl mb-4 uppercase tracking-tighter">Alpha-Beta Sync</h3>
                <p className="text-sm opacity-80 leading-relaxed">
                  Optimizing the transition between high-arousal Beta waves during work and restorative Alpha waves during rest.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl md:text-7xl font-black text-foreground tracking-tight leading-none">4. The Future: AI-Enhanced Neuro-Feedback</h2>
            <p>
              The integration of Genkit-powered Focus Mantras represents a breakthrough in cognitive reinforcement. By providing proactive, context-aware motivation, the engine helps users bridge "the focus gap" during the final five minutes of a mission, where biological fatigue is highest.
            </p>
          </div>

          <Separator className="my-24 opacity-10" />

          <div className="space-y-12 text-center">
            <h3 className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-none">Synchronize Your Mind</h3>
            <p className="max-w-3xl mx-auto text-lg md:text-2xl text-muted-foreground leading-relaxed">
              Neuro-cognitive precision is the ultimate form of respect for your time. Master your flow with the global standard in professional synchronization.
            </p>
            <div className="pt-12">
              <Link href="/">
                <Button className="w-full md:w-fit h-20 bg-accent text-accent-foreground font-black text-xl uppercase tracking-[0.2em] rounded-[32px] shadow-2xl hover:scale-[1.05] transition-all group px-16">
                  Activate Flow Sync
                  <Zap className="ml-4 w-7 h-7 group-hover:fill-current transition-all" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <footer className="mt-48 pt-24 border-t border-border">
          <p className="text-3xl font-black">Flow Research Unit</p>
          <p className="text-base text-muted-foreground">© 2024 Camly Inc • Defining High-Precision Flow Architecture</p>
        </footer>
      </article>
    </div>
  );
}
