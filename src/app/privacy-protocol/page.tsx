"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Lock, Eye, Database, Globe, UserCheck, FileText, Scale, Zap, Info, Clock, AlertCircle, Terminal, Fingerprint, Activity, Server, Key } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Camly Privacy Protocol",
  "description": "Comprehensive data privacy and sovereignty protocol for the Camly High-Precision Pomodoro Timer.",
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
            Protocol v2.4.0 Verified
          </Badge>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <header className="space-y-6 mb-16">
          <div className="flex gap-2">
            <Badge className="bg-primary/10 text-primary border-primary/20">System Integrity</Badge>
            <Badge variant="outline">User Sovereignty</Badge>
          </div>
          <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[0.95] md:leading-[0.85]">
            The Camly <span className="text-primary">Privacy Protocol</span>
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed italic border-l-4 border-primary/30 pl-6 py-2">
            "Your time is yours. Your data is yours. Our protocol is built on the non-negotiable principle of absolute user sovereignty. We do not sell your focus; we engineer the tools to master it."
          </p>
          <div className="flex items-center gap-4 pt-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
             <div className="flex items-center gap-2"><Clock className="w-3 h-3" /> Effective Date: Jan 20, 2024</div>
             <div className="flex items-center gap-2"><ShieldCheck className="w-3 h-3 text-accent" /> Security Grade: STRATUM-1</div>
          </div>
        </header>

        <section className="prose prose-invert prose-primary max-w-none space-y-12 text-muted-foreground text-sm md:text-lg leading-relaxed">
          
          <div className="glass p-8 md:p-12 border-primary/20 bg-primary/5 rounded-[40px] mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Fingerprint className="w-48 h-48" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight mt-0 mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6" /> 1. The Sovereignty Axiom
            </h2>
            <p className="text-foreground font-medium mb-4">
              Camly operates as a high-precision utility designed for elite cognitive performance. Unlike traditional web applications that treat user attention as a commodity, Camly treats it as a sovereign asset. Our privacy architecture is designed to minimize data extraction and maximize local control.
            </p>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-3">
              <Database className="w-6 h-6 text-primary" /> 2. Intelligence Capture (Data Collection)
            </h3>
            <p>
              We classify data into two distinct operational layers to ensure absolute clarity on what is processed:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-border rounded-3xl bg-muted/5">
                <h4 className="text-foreground font-bold mb-2 uppercase text-xs tracking-widest">Tactical Logs (Local)</h4>
                <p className="text-xs leading-relaxed opacity-80">
                  Your Pomodoro objectives, notes, and task lists are stored locally on your device using browser persistence (localStorage/IndexedDB). This data remains on your hardware and is never transmitted to our servers unless you explicitly activate Firebase synchronization.
                </p>
              </div>
              <div className="p-6 border border-border rounded-3xl bg-muted/5">
                <h4 className="text-foreground font-bold mb-2 uppercase text-xs tracking-widest">Telemetry (Atmospheric)</h4>
                <p className="text-xs leading-relaxed opacity-80">
                  We collect anonymized technical telemetry via Google Analytics 4 (GA4). This includes mission-entry points, feature engagement metrics, and high-level device coordinates (screen resolution, browser type). We do NOT collect PII (Personally Identifiable Information) in these streams.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-3">
              <Terminal className="w-6 h-6 text-primary" /> 3. Processing Protocol
            </h3>
            <p>
              Camly utilizes the following processing logic for your data:
            </p>
            <ul className="space-y-4 list-none p-0">
              <li className="flex gap-4 p-4 glass border-border rounded-2xl">
                <Activity className="w-5 h-5 text-accent shrink-0 mt-1" />
                <span className="text-sm"><strong>Focus Optimization:</strong> Analyzing feature usage to improve the high-fidelity performance of the Pomodoro engine.</span>
              </li>
              <li className="flex gap-4 p-4 glass border-border rounded-2xl">
                <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-1" />
                <span className="text-sm"><strong>Security Auditing:</strong> Monitoring system logs to prevent unauthorized access and maintain computational integrity.</span>
              </li>
              <li className="flex gap-4 p-4 glass border-border rounded-2xl">
                <Server className="w-5 h-5 text-accent shrink-0 mt-1" />
                <span className="text-sm"><strong>Synchronization:</strong> Facilitating cross-device parity for users who opt-in to our secure Firebase-backed cloud layers.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-3">
              <Lock className="w-6 h-6 text-primary" /> 4. Local Persistence & Cookies
            </h3>
            <p>
              We utilize technical "cookies" and local storage keys for strictly functional purposes:
            </p>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 font-black uppercase tracking-widest text-primary">Identifier</th>
                  <th className="py-3 font-black uppercase tracking-widest text-primary">Purpose</th>
                  <th className="py-3 font-black uppercase tracking-widest text-primary">Duration</th>
                </tr>
              </thead>
              <tbody className="opacity-80">
                <tr className="border-b border-border/50">
                  <td className="py-3 font-mono">chrono_settings</td>
                  <td className="py-3">Stores your theme and duration calibrations</td>
                  <td className="py-3">Persistent</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 font-mono">_ga</td>
                  <td className="py-3">Google Analytics session synchronization</td>
                  <td className="py-3">2 Years</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 font-mono">camly_tactical_logs</td>
                  <td className="py-3">Stores your objectives and focus notes</td>
                  <td className="py-3">Persistent</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-3">
              <Globe className="w-6 h-6 text-primary" /> 5. Global Compliance (GDPR/CCPA/CalOPPA)
            </h3>
            <p>
              Camly adheres to global standards for digital privacy. Regardless of your physical coordinates, you are entitled to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 border border-border rounded-2xl hover:border-primary/30 transition-colors">
                <h5 className="font-black text-xs uppercase mb-2 text-foreground">The Right to Erasure</h5>
                <p className="text-[11px] opacity-70">You can clear all local data instantly via browser settings. For cloud-synced data, contact our security ops for complete purging.</p>
              </div>
              <div className="p-5 border border-border rounded-2xl hover:border-primary/30 transition-colors">
                <h5 className="font-black text-xs uppercase mb-2 text-foreground">The Right to Access</h5>
                <p className="text-[11px] opacity-70">You have absolute transparency over what we collect. We do not engage in "shadow profiling" or hidden data harvesting.</p>
              </div>
              <div className="p-5 border border-border rounded-2xl hover:border-primary/30 transition-colors">
                <h5 className="font-black text-xs uppercase mb-2 text-foreground">Data Portability</h5>
                <p className="text-[11px] opacity-70">Your focus logs are your intellectual property. We provide mechanisms to export your tactical intelligence in structured formats.</p>
              </div>
              <div className="p-5 border border-border rounded-2xl hover:border-primary/30 transition-colors">
                <h5 className="font-black text-xs uppercase mb-2 text-foreground">Zero-Sale Policy</h5>
                <p className="text-[11px] opacity-70">Camly does not sell, rent, or trade your data to third-party marketing networks. Our revenue model is based on performance, not exploitation.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-primary" /> 6. Security Architecture
            </h3>
            <p>
              Our security stack utilizes **SSL/TLS 1.3 encryption** for all data in transit. For users utilizing our optional Firebase cloud integration, data is encrypted at rest using AES-256 standards. Our Security Operations Center (SOC) monitors for relativistic temporal drift and unauthorized access patterns to ensure system parity.
            </p>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-primary" /> 7. Children's Privacy Protocol
            </h3>
            <p>
              Camly is a professional utility and does not target users under the age of 13. If we discover that a child under 13 has synchronized data with our engine, we will execute an immediate purge of those coordinates from our active infrastructure.
            </p>
          </div>

          <Separator className="my-16 opacity-10" />

          <div className="space-y-8">
            <h3 className="text-3xl font-black text-foreground tracking-tight">Closing Statement on Trust</h3>
            <p>
              In a digital landscape dominated by data exploitation, Camly stands as a bastion of precision and privacy. We believe that professional productivity requires a safe, secure environment free from the noise of the tracking economy.
            </p>
            <div className="pt-10 flex flex-col md:flex-row gap-4">
              <Link href="/">
                <Button className="w-full md:w-fit h-16 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest rounded-2xl px-12 hover:scale-[1.02] transition-all shadow-2xl">
                  Accept & Return to Engine
                </Button>
              </Link>
              <Link href="/terms-of-sync">
                <Button variant="outline" className="w-full md:w-fit h-16 border-primary/20 font-black text-xs uppercase tracking-widest rounded-2xl px-12">
                   Review Terms of Sync
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-muted/10 p-8 rounded-[32px] border border-border mt-16">
            <h4 className="text-foreground font-black uppercase text-xs tracking-[0.2em] mb-4">Tactical Contact Points</h4>
            <p className="text-xs leading-relaxed opacity-70">
              For security inquiries, data erasure requests, or sovereignty disputes, please contact our Intelligence Unit:
              <br /><br />
              <strong>Email:</strong> privacy@camly.org<br />
              <strong>Address:</strong> Camly Operations Group, Data Sovereignty Division, Silicon Valley HQ.
            </p>
          </div>
        </section>

        <footer className="mt-32 pt-16 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-[12px] font-black uppercase tracking-[0.3em] text-primary">Chief Data Sovereignty Officer</p>
              <p className="text-lg font-bold">Camly Security Group</p>
              <p className="text-xs text-muted-foreground">© 2024 Camly Inc • Absolute Privacy Verified</p>
            </div>
            <div className="flex gap-4">
               <div className="w-12 h-12 rounded-xl bg-muted/20 flex items-center justify-center border border-border/50">
                  <ShieldCheck className="w-6 h-6 text-accent" />
               </div>
               <div className="w-12 h-12 rounded-xl bg-muted/20 flex items-center justify-center border border-border/50">
                  <Key className="w-6 h-6 text-primary" />
               </div>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}
