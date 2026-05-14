
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, Search, Plus, Trash2, 
  FileText, Clock, ShieldCheck, 
  Terminal, Database, Pin, PinOff,
  Sparkles, Hash, Loader2, X,
  ChevronRight, Sun, Moon, Palette, Check
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  updateDoc 
} from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { synthesizeNote } from '@/ai/flows/synthesize-note';

type Note = {
  id: string;
  title: string;
  content: string;
  category: string;
  tags?: string[];
  isPinned?: boolean;
  color?: string;
  updatedAt: any;
};

const COLOR_PALETTE = [
  { name: 'Default', hex: '' },
  { name: 'Tactical Red', hex: '#ef4444' },
  { name: 'Cyber Blue', hex: '#3b82f6' },
  { name: 'Bio Green', hex: '#22c55e' },
  { name: 'Ion Purple', hex: '#a855f7' },
  { name: 'Amber Signal', hex: '#f59e0b' },
  { name: 'Slate Steel', hex: '#64748b' },
];

export default function NotesEngine() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [synthesizingId, setSynthesizingId] = useState<string | null>(null);
  const [db, setDb] = useState<any>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('camly_theme') as 'light' | 'dark' | null;
    const systemTheme = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('camly_theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const { firestore } = initializeFirebase();
    setDb(firestore);

    const q = query(collection(firestore, 'notes'), orderBy('updatedAt', 'desc'));
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const notesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Note[];
        setNotes(notesData);
      },
      async (err) => {
        const permissionError = new FirestorePermissionError({
          path: 'notes',
          operation: 'list'
        });
        errorEmitter.emit('permission-error', permissionError);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleCreateNote = () => {
    if (!db) return;
    const newNote = {
      title: 'New Objective',
      content: '',
      category: 'General',
      isPinned: false,
      color: '',
      tags: [],
      updatedAt: serverTimestamp()
    };
    addDoc(collection(db, 'notes'), newNote).catch(async () => {
       const permissionError = new FirestorePermissionError({
        path: 'notes',
        operation: 'create',
        requestResourceData: newNote
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  const handleUpdateNote = (id: string, updates: Partial<Note>) => {
    if (!db) return;
    setIsSaving(true);
    const docRef = doc(db, 'notes', id);
    updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    })
    .then(() => setIsSaving(false))
    .catch(async () => {
      setIsSaving(false);
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'update',
        requestResourceData: updates
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  const handleDeleteNote = (id: string) => {
    if (!db) return;
    const docRef = doc(db, 'notes', id);
    deleteDoc(docRef).catch(async () => {
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'delete'
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  const handleSynthesize = async (id: string, content: string) => {
    if (!content.trim()) return;
    setSynthesizingId(id);
    try {
      const result = await synthesizeNote({ content });
      const synthesisText = `\n\n--- AI ANALYSIS ---\nSUMMARY: ${result.summary}\n\nDIRECTIVES:\n${result.actionItems.map(item => `- ${item}`).join('\n')}`;
      handleUpdateNote(id, { content: content + synthesisText });
    } catch (error) {
      console.error("Synthesis failed", error);
    } finally {
      setSynthesizingId(null);
    }
  };

  const filteredNotes = useMemo(() => {
    const filtered = notes.filter(n => 
      n.title.toLowerCase().includes(search.toLowerCase()) || 
      n.content.toLowerCase().includes(search.toLowerCase())
    );
    return [...filtered].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  }, [notes, search]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 transition-colors duration-300">
      <nav className="relative z-50 glass border-b border-border h-14 flex items-center px-4 md:px-6 justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center transition-all group-hover:scale-110">
              <Image src="/camly.png" alt="Camly" width={40} height={40} priority className="object-contain" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent uppercase font-roboto-slab">
                NOTES ENGINE
              </h1>
              <span className="text-[7px] font-bold tracking-[0.3em] text-primary/60 uppercase mt-1">Direct Grid Editor v3.2</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3 mr-4">
             <div className="flex items-center gap-2">
                <div className={cn("w-1.5 h-1.5 rounded-full", isSaving ? "bg-accent animate-pulse" : "bg-primary")} />
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">
                   {isSaving ? 'Syncing...' : 'Synced'}
                </span>
             </div>
          </div>
          <div className="flex items-center gap-2 border-l border-border pl-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full text-muted-foreground hover:text-primary transition-colors"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            <Link href="/focus">
              <Button variant="ghost" size="sm" className="rounded-full text-[10px] font-black uppercase tracking-widest gap-2 h-8 px-4 border border-transparent hover:border-primary/20 transition-all">
                <ArrowLeft className="w-3 h-3" /> Back to Timer
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow container max-w-[1800px] mx-auto px-4 py-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-center justify-end gap-6">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-muted-foreground" />
              <Input 
                placeholder="Search logs..." 
                className="pl-10 h-9 bg-muted/50 border-border rounded-lg text-xs font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleCreateNote}
              className="h-9 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-lg shadow-lg gap-2 hover:scale-[1.05] transition-all px-4"
            >
              <Plus className="w-3.5 h-3.5" /> New Objective
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
          {filteredNotes.length === 0 ? (
            <div className="col-span-full h-[400px] glass-card !p-12 border-dashed border-border/40 flex flex-col items-center justify-center text-center opacity-30">
               <div className="w-24 h-24 rounded-[3rem] bg-muted flex items-center justify-center mb-8 animate-pulse">
                  <FileText className="w-12 h-12 text-muted-foreground" />
               </div>
               <h3 className="text-3xl font-black tracking-tighter mb-4">No Tactical Logs Found</h3>
               <p className="text-sm font-medium max-w-[280px] leading-relaxed uppercase tracking-widest opacity-60">Initiate new mission coordinates to begin your intelligence capture.</p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div 
                key={note.id}
                className={cn(
                  "group relative glass rounded-2xl p-4 md:p-5 flex flex-col gap-3 border-2 transition-all h-[320px] shadow-md",
                  note.isPinned ? "border-accent/40 bg-accent/5" : "border-primary/20 bg-muted/5",
                  "focus-within:border-primary/60 focus-within:shadow-xl focus-within:bg-background"
                )}
                style={{ 
                  backgroundColor: note.color ? `${note.color}15` : undefined,
                  borderColor: note.color ? `${note.color}40` : undefined
                }}
              >
                <div className="flex justify-between items-start gap-2">
                   <Badge variant="outline" className={cn(
                     "text-[7px] font-black uppercase tracking-widest h-4 px-1.5",
                     note.isPinned ? "bg-accent/10 text-accent border-accent/20" : "bg-primary/5 text-primary border-primary/20"
                   )}
                   style={note.color && !note.isPinned ? { backgroundColor: `${note.color}20`, color: note.color, borderColor: `${note.color}40` } : undefined}
                   >
                      {note.isPinned ? <Pin className="w-2 h-2 mr-1 fill-accent" /> : <Terminal className="w-2 h-2 mr-1" />}
                      {note.isPinned ? 'Priority' : note.id.slice(0, 6)}
                   </Badge>
                   <div className="flex items-center gap-1 shrink-0">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-6 h-6 rounded-md text-muted-foreground/30 hover:text-primary transition-all"
                            title="Calibrate Color"
                          >
                            <Palette className="w-3 h-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-2 bg-popover border-border shadow-xl">
                          <div className="grid grid-cols-4 gap-2">
                            {COLOR_PALETTE.map((color) => (
                              <button
                                key={color.name}
                                onClick={() => handleUpdateNote(note.id, { color: color.hex })}
                                className={cn(
                                  "w-8 h-8 rounded-full border border-border/50 flex items-center justify-center transition-all hover:scale-110",
                                  color.hex === '' ? "bg-transparent border-dashed" : ""
                                )}
                                style={{ backgroundColor: color.hex || undefined }}
                                title={color.name}
                              >
                                {note.color === color.hex && <Check className={cn("w-3 h-3", color.hex === '' ? "text-primary" : "text-white")} />}
                              </button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpdateNote(note.id, { isPinned: !note.isPinned })}
                        className={cn(
                          "w-6 h-6 rounded-md transition-all",
                          note.isPinned ? "text-accent" : "text-muted-foreground/30 hover:text-primary"
                        )}
                      >
                        {note.isPinned ? <Pin className="w-3 h-3 fill-accent" /> : <PinOff className="w-3 h-3" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteNote(note.id)}
                        className="w-6 h-6 rounded-md text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                   </div>
                </div>

                <div className="space-y-3 flex-grow flex flex-col">
                   <div className="bg-black/5 dark:bg-white/5 rounded-lg px-2 py-1.5 border border-primary/10 focus-within:border-primary/30 transition-colors"
                        style={note.color ? { borderColor: `${note.color}30`, backgroundColor: `${note.color}05` } : undefined}>
                     <Input 
                        value={note.title}
                        onChange={(e) => handleUpdateNote(note.id, { title: e.target.value })}
                        className="text-xs font-black tracking-tight bg-transparent border-none p-0 h-auto focus:ring-0 placeholder:text-muted-foreground/30 leading-tight"
                        placeholder="Mission Title"
                     />
                   </div>
                   <div className="flex-grow flex flex-col bg-black/5 dark:bg-white/5 rounded-xl border border-primary/10 p-3 group-focus-within:border-primary/30 transition-colors"
                        style={note.color ? { borderColor: `${note.color}30`, backgroundColor: `${note.color}05` } : undefined}>
                      <Textarea 
                          value={note.content}
                          onChange={(e) => handleUpdateNote(note.id, { content: e.target.value })}
                          className="flex-grow bg-transparent border-none p-0 text-[11px] font-medium leading-relaxed resize-none focus:ring-0 placeholder:text-muted-foreground/10 custom-scrollbar"
                          placeholder="Capture tactical data..."
                      />
                   </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/10 mt-auto">
                   <div className="flex items-center gap-2">
                      <Button 
                        onClick={() => handleSynthesize(note.id, note.content)}
                        disabled={synthesizingId === note.id || !note.content.trim()}
                        variant="outline"
                        className="h-7 px-2 bg-primary/5 border-primary/20 text-primary font-black text-[8px] uppercase tracking-widest rounded-md gap-1.5 hover:bg-primary hover:text-white transition-all"
                        style={note.color ? { borderColor: `${note.color}40`, color: note.color, backgroundColor: `${note.color}10` } : undefined}
                      >
                        {synthesizingId === note.id ? <Loader2 className="w-2.5 h-2.5 animate-spin" /> : <Sparkles className="w-2.5 h-2.5" />}
                        AI Sync
                      </Button>
                      <span className="text-[7px] text-muted-foreground/30 font-bold uppercase tabular-nums">
                        {note.updatedAt ? format(note.updatedAt.toDate(), 'HH:mm') : '--'}
                      </span>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-md bg-muted flex items-center justify-center">
                         <Hash className="w-2 h-2 text-muted-foreground/60" />
                      </div>
                      <span className="text-[8px] font-black uppercase text-primary/40" style={note.color ? { color: `${note.color}80` } : undefined}>Active</span>
                   </div>
                </div>

                {synthesizingId === note.id && (
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-2xl animate-in fade-in duration-300">
                     <div className="flex flex-col items-center gap-2">
                        <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-primary">Synthesizing...</span>
                     </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="relative mt-auto pt-16 pb-8 px-6 transition-colors duration-700 border-t glass border-border/40">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <Image src="/camly.png" alt="Camly" width={32} height={32} className="object-contain" />
                <h2 className="text-lg font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent uppercase font-roboto-slab">
                  CAMLY
                </h2>
              </div>
              <p className="text-xs leading-relaxed max-w-xs font-medium text-muted-foreground">
                Defining the standard for high-precision documentation. 
                Camly Inc's flagship engine for tactical insight capture and AI synthesis.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Operations</h3>
              <ul className="space-y-2 text-xs font-bold text-muted-foreground">
                <li className="hover:text-primary transition-colors flex items-center gap-2">
                   <ChevronRight className="w-3 h-3 opacity-30" />
                   <Link href="/focus">Pomodoro Timer</Link>
                </li>
                <li className="hover:text-primary transition-colors flex items-center gap-2 font-black text-primary">
                   <ChevronRight className="w-3 h-3 opacity-100" />
                   <Link href="/notes">Notes Engine</Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Architecture</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[9px] font-black tracking-widest text-accent">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-accent" />
                  CAMLY-SYNC-01: ONLINE
                </div>
                <div className="flex items-center gap-2 text-[9px] font-bold text-primary">
                  <ShieldCheck className="w-3 h-3" /> High-Parity Security Active
                </div>
              </div>
            </div>
          </div>
          <Separator className="mb-8 bg-border/40" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[8px] uppercase tracking-[0.5em] font-black text-muted-foreground/40">
              © 2024 Camly Inc • Defining High-Precision Velocity
            </p>
            <div className="flex gap-6">
              <Link href="/privacy-protocol" className="text-[8px] uppercase tracking-[0.2em] transition-colors font-black text-muted-foreground/40 hover:text-primary">Privacy Protocol</Link>
              <Link href="/terms-of-sync" className="text-[8px] uppercase tracking-[0.2em] transition-colors font-black text-muted-foreground/40 hover:text-primary">Terms of Sync</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
