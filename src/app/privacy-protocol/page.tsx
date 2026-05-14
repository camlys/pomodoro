"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Lock, Eye, Database, Globe, UserCheck, FileText, Scale, Zap, Info, Clock, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Camly Privacy Protocol",
  "description": "Comprehensive data privacy and sovereignty protocol for the Camly High-Precision Focus Engine.",
  "publisher": {
    "@type": "Organization",
    "name": "Camly Operations"
  }
};

export default function PrivacyProtocolPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
      />
      
      <nav className="relative z-50 glass border-b border-border h-14 flex items-center px-4 md:px-8 justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
          <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Back to Engine</span>
        </Link>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="border-accent/30 text-accent uppercase tracking-widest text-[9px] px-3 py-1">
            Protocol v1.4.2 Verified
          </Badge>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <header className="space-y-6 mb-16">
          <div className="flex gap-2">
            <Badge className="bg-primary/10 text-primary border-primary/20">System Integrity</Badge>
            <Badge variant="outline">User Sovereignty</Badge>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.95] md:leading-[0.85]">
            The Camly <span className="text-primary">Privacy Protocol</span>
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed italic border-l-4 border-primary/30 pl-6 py-2">
            "Your time is yours. Your data is yours. Our protocol is built on the non-negotiable principle of absolute user sovereignty."
          </p>
        </header>

        <section className="prose prose-invert prose-primary max-w-none space-y-12 text-muted-foreground text-sm md:text-lg leading-relaxed">
          {/* Privacy content truncated but remaining consistent with Camly's focus-only utility */}
          <div className="glass p-8 md:p-12 border-primary/20 bg-primary/5 rounded-[40px] mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight mt-0 mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6" /> Executive Summary of Sovereignty
            </h2>
            <p className="text-foreground font-medium mb-4">
              At Camly, we focus on facilitating your deep work sessions with absolute privacy.
            </p>
          </div>
          
          <Separator className="my-16 opacity-10" />

          <div className="space-y-8">
            <h3 className="text-2xl font-black text-foreground tracking-tight">Closing Statement on Trust</h3>
            <p>
              In a digital landscape dominated by data exploitation, Camly stands as a bastion of precision and privacy.
            </p>
            <div className="pt-10 flex flex-col md:flex-row gap-4">
              <Link href="/">
                <Button className="w-full md:w-fit h-16 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest rounded-2xl px-12">
                  Accept & Return to Engine
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <footer className="mt-32 pt-16 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-[12px] font-black uppercase tracking-[0.3em] text-primary">Chief Data Sovereignty Officer</p>
              <p className="text-lg font-bold">Camly Security Group</p>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}