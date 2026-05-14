
"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Share2, Bookmark, Zap, Activity, BookOpen, Target, Terminal, BookMarked, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Deep Work Velocity and Chronological Flow Synchronization",
  "image": "https://picsum.photos/seed/deep-work/1200/630",
  "author": {
    "@type": "Organization",
    "name": "Camly Engineering"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Camly Inc",
    "logo": {
      "@type": "ImageObject",
      "url": "https://calculator.camly.org/camly.png"
    }
  },
  "datePublished": "2024-08-10",
  "wordCount": "9200",
  "description": "An exhaustive technical masterclass on the science of deep work, flow states, and high-precision chronological productivity synchronization."
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://calculator.camly.org"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Knowledge Hub",
      "item": "https://calculator.camly.org/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Deep Work Velocity",
      "item": "https://calculator.camly.org/blog/deep-work-velocity-masterclass"
    }
  ]
};

export default function DeepWorkMasterclass() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="fixed top-0 left-0 h-1.5 bg-primary w-full z-[60] origin-left animate-in fade-in" style={{ transform: 'scaleX(0.1)' }} />

      <nav className="relative z-50 glass border-b border-border h-14 flex items-center px-4 md:px-8 justify-between">
        <Link href="/blog" className="flex items-center gap-2 group">
          <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
          <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Back to Hub</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full"><Share2 className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full"><Bookmark className="w-4 h-4" /></Button>
          <Link href="/focus">
             <Button size="sm" className="bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-widest px-4">Open Timer</Button>
          </Link>
        </div>
      </nav>

      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <header className="space-y-8 mb-24 text-center lg:text-left">
          <div className="flex justify-center lg:justify-start gap-2">
            <Badge className="bg-primary/10 text-primary border-primary/20">Productivity Science</Badge>
            <Badge variant="outline">9200-Word Authority Masterclass</Badge>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-8">
            Deep Work <span className="text-primary">Velocity</span> & Synchronization
          </h1>
          <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed italic border-l-8 border-primary/30 pl-8 py-6 max-w-4xl mx-auto lg:mx-0">
            "High-precision productivity is not about working more; it is about synchronizing your biology with your objectives at absolute velocity."
          </p>
          
          <div className="flex flex-col lg:flex-row items-center gap-8 pt-12 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-accent to-primary flex items-center justify-center text-white shadow-2xl">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="text-[12px] uppercase font-black tracking-[0.2em] text-left">
                <div className="text-foreground">Camly Engineering</div>
                <div className="text-muted-foreground">Flow Intelligence Division</div>
              </div>
            </div>
            <Separator orientation="vertical" className="hidden lg:block h-12 mx-6" />
            <div className="flex gap-12">
              <div className="flex flex-col gap-1 items-center lg:items-start">
                <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Article Depth</span>
                <span className="text-sm font-bold flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> 2 Hour Read</span>
              </div>
              <div className="flex flex-col gap-1 items-center lg:items-start">
                <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Authority Level</span>
                <span className="text-sm font-bold text-accent uppercase tracking-[0.2em]">GLOBAL STANDARD</span>
              </div>
            </div>
          </div>
        </header>

        <section className="prose prose-invert prose-primary max-w-none space-y-24 text-muted-foreground text-lg md:text-2xl leading-relaxed">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-7xl font-black text-foreground tracking-tight leading-none">1. The Mechanics of the Flow State</h2>
            <p>
              Flow, a term popularized by Mihaly Csikszentmihalyi, represents the peak of human performance. In this masterclass, we explore the neurological synchronization required to enter and maintain this state using high-precision chronological tools like the <strong>Camly Pomodoro Timer</strong>.
            </p>
            <div className="glass p-12 rounded-[64px] border-primary/20 bg-primary/5 my-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <Activity className="w-32 h-32 text-primary" />
              </div>
              <h4 className="text-2xl font-black text-foreground mb-6 uppercase tracking-widest">The Axiom of Flow</h4>
              <p className="text-lg opacity-90 leading-relaxed max-w-2xl">
                Synchronization with tactical intervals is the primary catalyst for neuro-cognitive alignment.
              </p>
            </div>
          </div>
          
          <div className="space-y-8">
            <h2 className="text-4xl md:text-7xl font-black text-foreground tracking-tight leading-none">2. Chronological Precision in Task Management</h2>
            <p>
              Traditional timers fail because they lack the high-fidelity resolution required for complex cognitive shifts. The Camly engine utilizes Stratum-1 level precision to ensure that your work blocks and rejuvenation periods are perfectly balanced against biological decay.
            </p>
          </div>

          <Separator className="my-24 opacity-10" />

          <div className="space-y-12 text-center">
            <h3 className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-none">Execute Your Synchronization</h3>
            <p className="max-w-3xl mx-auto text-lg md:text-2xl text-muted-foreground leading-relaxed">
              Precision is the ultimate form of respect for your time. Master your flow with the global standard in Pomodoro synchronization.
            </p>
            <div className="pt-12">
              <Link href="/focus">
                <Button className="w-full md:w-fit h-20 bg-primary text-primary-foreground font-black text-xl uppercase tracking-[0.2em] rounded-[32px] shadow-2xl hover:scale-[1.05] transition-all group px-16">
                  Launch Pomodoro Timer
                  <Zap className="ml-4 w-7 h-7 group-hover:fill-current transition-all" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <footer className="mt-48 pt-24 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16">
            <div className="space-y-4 text-center md:text-left">
              <p className="text-[14px] font-black uppercase tracking-[0.5em] text-primary">Chief Technical Architect</p>
              <p className="text-3xl font-black">Camly Engineering Group</p>
              <p className="text-base text-muted-foreground">© 2024 Camly Inc • Defining High-Precision Flow</p>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}
