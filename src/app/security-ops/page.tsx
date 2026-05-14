"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Server, Lock, Fingerprint, Activity, Zap, Clock, ShieldCheck, Cpu, Globe, Key, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const securitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Camly Security Operations Center",
  "description": "Comprehensive security architecture and threat mitigation protocols for the Camly High-Precision Pomodoro Timer.",
  "publisher": {
    "@type": "Organization",
    "name": "Camly Operations"
  }
};

export default function SecurityOpsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(securitySchema) }}
      />
      
      <nav className="relative z-50 glass border-b border-border h-14 flex items-center px-4 md:px-8 justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
          <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Back to Engine</span>
        </Link>
        <div className="flex items-center gap-4">
          <Badge className="bg-accent/10 text-accent border-accent/20 uppercase tracking-widest text-[9px] px-3 py-1 animate-pulse">
            System Status: 100% Secure
          </Badge>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <header className="space-y-6 mb-16">
          <div className="flex gap-2">
            <Badge className="bg-primary/10 text-primary border-primary/20 uppercase tracking-widest font-black text-[9px]">Defense-In-Depth</Badge>
            <Badge variant="outline" className="uppercase tracking-widest font-black text-[9px]">Infrastructure Resilience</Badge>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.95] md:leading-[0.85]">
            Security <span className="text-primary">Operations</span> & Architecture
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed italic border-l-4 border-primary/30 pl-6 py-2">
            "The integrity of focus requires the absolute integrity of the system."
          </p>
        </header>

        <section className="prose prose-invert prose-primary max-w-none space-y-12 text-muted-foreground text-sm md:text-lg leading-relaxed">
           <div className="glass p-8 md:p-12 border-primary/20 bg-primary/5 rounded-[40px] mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Fingerprint className="w-24 h-24 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight mt-0 mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6" /> Security Mission Statement
            </h2>
            <p className="text-foreground font-medium mb-4">
              At Camly, security is the foundational state. Our Security Operations Center (SOC) operates 24/7/365 to maintain the highest levels of computational integrity for your deep work sessions.
            </p>
          </div>

          <Separator className="my-16 opacity-10" />

          <div className="space-y-8">
            <h3 className="text-2xl font-black text-foreground tracking-tight">Continuous Security Evolution</h3>
            <div className="pt-10 flex flex-col md:flex-row gap-4">
              <Link href="/">
                <Button className="w-full md:w-fit h-16 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest rounded-2xl px-12">
                  Launch Secure Engine
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <footer className="mt-32 pt-16 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-[12px] font-black uppercase tracking-[0.3em] text-primary">Chief Security Officer</p>
              <p className="text-lg font-bold">Camly Security Operations Center</p>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}
