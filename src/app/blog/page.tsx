
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, ChevronRight, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { InstallPWA } from '@/components/chrono/InstallPWA';

const BLOG_POSTS = [
  {
    title: "Neuro-Cognitive Flow Synchronization Masterclass",
    description: "An exhaustive 11,000-word neuroscientific exploration into flow state synchronization and deep work performance.",
    date: "September 05, 2024",
    author: "Flow Research Unit",
    readTime: "240 min read",
    slug: "/blog/neuro-cognitive-flow-synchronization-masterclass",
    category: "Masterclass"
  },
  {
    title: "The Digital Infrastructure Velocity Protocol",
    description: "A definitive 10,200-word technical protocol for maximizing enterprise infrastructure velocity and asset optimization.",
    date: "September 10, 2024",
    author: "Camly Tech Ops",
    readTime: "210 min read",
    slug: "/blog/digital-infrastructure-velocity-protocol",
    category: "Technical Protocol"
  },
  {
    title: "Chronological Sovereignty Enterprise Whitepaper",
    description: "An exhaustive 10,500-word whitepaper on global time standards, atomic synchronization, and strategic infrastructure.",
    date: "September 01, 2024",
    author: "Camly Operations",
    readTime: "180 min read",
    slug: "/blog/chronological-sovereignty-enterprise-whitepaper",
    category: "Enterprise Whitepaper"
  },
  {
    title: "Deep Work Velocity and Chronological Flow Synchronization",
    description: "The definitive 9200-word authoritative guide exploring the science behind deep work, flow states, and high-precision productivity synchronization.",
    date: "August 10, 2024",
    author: "Camly Engineering",
    readTime: "120 min read",
    slug: "/blog/deep-work-velocity-masterclass",
    category: "Masterclass"
  },
  {
    title: "The Enterprise Blueprint for Digital Asset Velocity",
    description: "The definitive enterprise guide to maximizing digital asset velocity through high-precision optimization and edge-compute architectures.",
    date: "July 15, 2024",
    author: "Camly Ops Team",
    readTime: "90 min read",
    slug: "/blog/digital-asset-velocity-enterprise-guide",
    category: "Enterprise Whitepaper"
  },
  {
    title: "The Master Guide to Global Time Synchronization",
    description: "An exhaustive technical guide to the science of time synchronization, NTP protocols, and high-precision chronological engineering.",
    date: "July 10, 2024",
    author: "Camly Engineering",
    readTime: "60 min read",
    slug: "/blog/global-time-synchronization-standards",
    category: "Chronology"
  },
  {
    title: "The Ultimate Guide to Image and PDF Resizing",
    description: "Master the art of digital asset management. Learn how high-precision resizing impacts SEO, web performance, and document integrity.",
    date: "June 05, 2024",
    author: "Camly Tech Ops",
    readTime: "45 min read",
    slug: "/blog/image-and-pdf-resizing-optimization",
    category: "Asset Management"
  },
  {
    title: "How AI is Revolutionizing Personal Utilities",
    description: "Discover how Genkit and LLMs are transforming simple calculators into intelligent lifestyle companions.",
    date: "May 22, 2024",
    author: "AI Insights Team",
    readTime: "30 min read",
    slug: "/blog/ai-revolution-personal-utilities",
    category: "Technology"
  }
];

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Camly Insights Hub",
  "description": "Expert insights on file optimization, chronological precision, and the evolution of digital utility tools by Camly Inc.",
  "publisher": {
    "@type": "Organization",
    "name": "Camly Inc"
  },
  "blogPost": BLOG_POSTS.map(post => ({
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "url": `https://calculator.camly.org${post.slug}`
  }))
};

export default function BlogHub() {
  const [search, setSearch] = useState('');

  const filteredPosts = BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase()) || 
    post.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <nav className="relative z-50 glass border-b border-border h-14 flex items-center px-4 md:px-6 justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center transition-all group-hover:scale-110">
            <Image src="/camly.png" alt="Camly Insights" width={40} height={40} priority className="object-contain" />
          </div>
          <h1 className="text-sm md:text-base font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            CAMLY <span className="text-foreground/50 font-normal ml-2">INSIGHTS</span>
          </h1>
        </Link>
        <Link href="/">
          <Button variant="ghost" size="sm" className="rounded-full text-xs gap-2">
            <ArrowLeft className="w-3 h-3" /> Back to App
          </Button>
        </Link>
      </nav>

      <main className="flex-grow container max-w-5xl mx-auto px-4 py-12">
        <header className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="border-primary/30 text-primary uppercase tracking-widest text-[10px] px-3 py-1">
            Knowledge Center
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
            Digital <span className="text-primary">Optimization</span> & <span className="text-accent">Precision</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium">
            Exploring the intersection of file optimization, chronological precision, and the evolution of digital utility tools by Camly Inc.
          </p>
          
          <div className="max-w-md mx-auto relative pt-4">
            <Search className="absolute left-3 top-7 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search articles..." 
              className="pl-10 bg-muted/50 border-border h-12 rounded-xl focus:ring-2 focus:ring-primary/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post, i) => (
            <div key={i} className="glass p-6 rounded-3xl border border-border hover:border-primary/20 transition-all flex flex-col group">
              <div className="space-y-4 flex-grow">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="text-[9px] uppercase tracking-widest">{post.category}</Badge>
                  <span className="text-[9px] text-muted-foreground flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                </div>
                <h3 className="text-xl font-black tracking-tight group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{post.description}</p>
              </div>
              <div className="mt-6 pt-6 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                <span>{post.date}</span>
                <Link href={post.slug} className="text-primary hover:underline flex items-center gap-1">
                  Read More <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer className="relative mt-auto pt-24 pb-12 px-6 transition-colors duration-700 border-t glass border-border/40">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2 lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center transition-all">
                  <Image src="/camly.png" alt="Camly" width={48} height={48} className="object-contain" />
                </div>
                <h2 className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent uppercase font-roboto-slab">
                  CAMLY
                </h2>
              </div>
              <p className="text-sm leading-relaxed max-w-xs font-medium text-muted-foreground">
                Defining the standard for high-precision focus synchronization. 
                Camly Inc's flagship engine for professional and tactical performance.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Operations</h3>
              <ul className="space-y-3 text-xs font-bold text-muted-foreground">
                <li className="hover:text-primary transition-colors flex items-center gap-2">
                   <ChevronRight className="w-3 h-3 opacity-30" />
                   <Link href="/">Pomodoro Mode</Link>
                </li>
                <li className="hover:text-primary transition-colors flex items-center gap-2">
                   <ChevronRight className="w-3 h-3 opacity-30" />
                   <Link href="/notes">Notes Engine</Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Intelligence</h3>
              <ul className="space-y-3 text-xs font-bold text-muted-foreground">
                <li className="hover:text-primary transition-colors flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 opacity-30" />
                  <Link href="/blog">Knowledge Hub</Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Architecture</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 text-[10px] font-black tracking-widest text-accent">
                  <div className="w-2 h-2 rounded-full animate-pulse bg-accent" />
                  CAMLY-SYNC-01: ONLINE
                </div>
                <InstallPWA />
              </div>
            </div>
          </div>

          <Separator className="mb-10 bg-border/60" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] uppercase tracking-[0.5em] font-black text-muted-foreground/40">
              © 2024 Camly Inc • Defining High-Precision Velocity
            </p>
            <div className="flex gap-8">
              <Link href="/privacy-protocol" className="text-[10px] uppercase tracking-[0.2em] transition-colors font-black text-muted-foreground/40 hover:text-primary">Privacy Protocol</Link>
              <Link href="/terms-of-sync" className="text-[10px] uppercase tracking-[0.2em] transition-colors font-black text-muted-foreground/40 hover:text-primary">Terms of Sync</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
