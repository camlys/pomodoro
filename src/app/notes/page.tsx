
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, Search, Plus, Trash2, 
  FileText, Clock, ShieldCheck, 
  Terminal, Database, Globe, ChevronRight,
  ExternalLink, Twitter, Pin, PinOff,
  Sparkles, ListChecks, Hash, Info,
  BarChart3, Loader2, Save, X, LayoutGrid, Maximize2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import { InstallPWA } from '@/components/chrono/InstallPWA';
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
  updatedAt: any;
};

export default function NotesEngine() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [db, setDb] = useState<any>(null);

  const selectedNote = notes.find(n => n.id === selectedNoteId);

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
      tags: [],
      updatedAt: serverTimestamp()
    };
    addDoc(collection(db, 'notes'), newNote).then((docRef) => {
      setSelectedNoteId(docRef.id);
    }).catch(async () => {
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
    if (selectedNoteId === id) setSelectedNoteId(null);
  };

  const handleSynthesize = async () => {
    if (!selectedNote || !selectedNote.content.trim()) return;
    setIsSynthesizing(true);
    try {
      const result = await synthesizeNote({ content: selectedNote.content });
      const synthesisText = `\n\n--- AI ANALYSIS ---\nSUMMARY: ${result.summary}\n\nDIRECTIVES:\n${result.actionItems.map(item => `- ${item}`).join('\n')}`;
      handleUpdateNote(selectedNote.id, { content: selectedNote.content + synthesisText });
    } catch (error) {
      console.error("Synthesis failed", error);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const filteredNotes = useMemo(() => {
    const filtered = notes.filter(n => 
      n.title.toLowerCase().includes(search.toLowerCase()) || 
      n.content.toLowerCase().includes(search.toLowerCase())
    );
    // Sort: Pinned first, then by date
    return [...filtered].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  }, [notes, search]);

  const wordCount = selectedNote?.content ? selectedNote.content.trim().split(/\s+/).length : 0;
  const charCount = selectedNote?.content ? selectedNote.content.length : 0;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30">
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
              <span className="text-[7px] font-bold tracking-[0.3em] text-primary/60 uppercase mt-1">v2.5.0 Authority</span>
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
          <Link href="/focus">
            <Button variant="ghost" size="sm" className="rounded-full text-[10px] font-black uppercase tracking-widest gap-2 h-8 px-4 border border-transparent hover:border-primary/20 transition-all">
              <ArrowLeft className="w-3 h-3" /> Back to Timer
            </Button>
          </Link>
        </div>
      </nav>

      <main className="flex-grow container max-w-[1600px] mx-auto px-4 py-8 flex flex-col gap-8">
        
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
             <h2 className="text-2xl md:text-3xl font-black tracking-tighter flex items-center gap-3">
               <LayoutGrid className="w-6 h-6 text-primary" /> Intelligence Dashboard
             </h2>
             <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
               Managing {notes.length} mission-critical tactical logs
             </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:w-80">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search logs..." 
                className="pl-10 h-10 bg-muted/50 border-border rounded-xl focus:ring-2 focus:ring-primary/20 font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleCreateNote}
              className="h-10 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg gap-2 hover:scale-[1.05] transition-all px-6"
            >
              <Plus className="w-4 h-4" /> New Objective
            </Button>
          </div>
        </div>

        {/* Dynamic View: Grid or Editor */}
        <div className="flex-grow">
          {selectedNoteId ? (
            <div className="flex-grow glass-card !p-6 md:!p-10 flex flex-col gap-6 animate-in zoom-in-95 duration-300 relative border-primary/20">
               
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="space-y-1 flex-grow w-full md:w-auto">
                    <div className="flex items-center gap-3 mb-2">
                       <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-primary/20 text-primary bg-primary/5 h-5">
                          <Terminal className="w-3 h-3 mr-1.5" /> ID: {selectedNote?.id.slice(0, 8)}
                       </Badge>
                       <span className="text-[9px] text-muted-foreground/60 font-bold uppercase flex items-center gap-1.5">
                          <Clock className="w-3 h-3" /> Updated {selectedNote?.updatedAt ? format(selectedNote.updatedAt.toDate(), 'MMM dd, HH:mm') : 'just now'}
                       </span>
                    </div>
                    <Input 
                      value={selectedNote?.title}
                      onChange={(e) => selectedNote && handleUpdateNote(selectedNote.id, { title: e.target.value })}
                      className="text-3xl md:text-5xl font-black tracking-tighter bg-transparent border-none p-0 h-auto focus:ring-0 placeholder:text-muted-foreground/20 leading-none"
                      placeholder="Mission Title"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => selectedNote && handleUpdateNote(selectedNote.id, { isPinned: !selectedNote.isPinned })}
                      className={cn(
                        "h-10 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest gap-2 transition-all",
                        selectedNote?.isPinned ? "bg-accent/10 border-accent/30 text-accent" : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {selectedNote?.isPinned ? <Pin className="w-3.5 h-3.5 fill-accent" /> : <PinOff className="w-3.5 h-3.5" />}
                      {selectedNote?.isPinned ? 'Pinned' : 'Pin Log'}
                    </Button>

                    <Button 
                      onClick={handleSynthesize}
                      disabled={isSynthesizing || !selectedNote?.content.trim()}
                      className="h-10 px-4 bg-gradient-to-r from-primary to-accent text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
                    >
                      {isSynthesizing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                      AI Synthesis
                    </Button>

                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => selectedNoteId && handleDeleteNote(selectedNoteId)}
                      className="w-10 h-10 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>

                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setSelectedNoteId(null)}
                      className="w-10 h-10 rounded-xl bg-muted/50 hover:bg-muted"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
               </div>

               <Separator className="bg-border/30" />

               <div className="flex-grow flex flex-col min-h-[400px]">
                  <Textarea 
                    value={selectedNote?.content}
                    onChange={(e) => selectedNote && handleUpdateNote(selectedNote.id, { content: e.target.value })}
                    className="flex-grow bg-transparent border-none p-0 text-lg md:text-xl font-medium leading-relaxed resize-none focus:ring-0 placeholder:text-muted-foreground/10 custom-scrollbar"
                    placeholder="Capture tactical data and mission parameters here..."
                  />
               </div>

               <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-border/30">
                  <div className="flex flex-wrap items-center gap-6">
                     <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                           <BarChart3 className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div className="space-y-0.5">
                           <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60 block">Intelligence Density</span>
                           <p className="text-[10px] font-bold text-foreground uppercase">{wordCount} Words / {charCount} Chars</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
                           <Hash className="w-3.5 h-3.5 text-accent" />
                        </div>
                        <div className="space-y-0.5">
                           <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60 block">Tactical Directives</span>
                           <p className="text-[10px] font-bold text-foreground uppercase">{selectedNote?.tags?.length || 0} Registered Tags</p>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-primary/60 bg-primary/5 px-4 py-2 rounded-xl border border-primary/10">
                     <ShieldCheck className="w-3.5 h-3.5" /> High-Parity Security Active
                  </div>
               </div>

               {isSynthesizing && (
                 <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] z-50 flex items-center justify-center rounded-3xl animate-in fade-in duration-300">
                    <div className="glass-card !p-8 flex flex-col items-center gap-4 border-primary/20 shadow-2xl scale-110">
                       <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                       <div className="text-center space-y-1">
                          <p className="text-sm font-black uppercase tracking-widest text-foreground">AI Intelligence synthesis</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">Executing pattern recognition protocols...</p>
                       </div>
                       <Loader2 className="w-6 h-6 animate-spin text-primary/40" />
                    </div>
                 </div>
               )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredNotes.length === 0 ? (
                <div className="col-span-full h-[400px] glass-card !p-12 border-dashed border-border/30 flex flex-col items-center justify-center text-center opacity-30">
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
                    onClick={() => setSelectedNoteId(note.id)}
                    className="group relative glass rounded-[2.5rem] border border-border p-8 flex flex-col gap-4 cursor-pointer hover:border-primary/40 hover:translate-y-[-4px] transition-all h-[320px]"
                  >
                    <div className="flex justify-between items-start">
                       <Badge variant="outline" className={cn(
                         "text-[8px] font-black uppercase tracking-widest h-5",
                         note.isPinned ? "bg-accent/10 text-accent border-accent/20" : "bg-primary/5 text-primary border-primary/20"
                       )}>
                          {note.isPinned ? <Pin className="w-2.5 h-2.5 mr-1 fill-accent" /> : <Terminal className="w-2.5 h-2.5 mr-1" />}
                          {note.isPinned ? 'Priority' : note.id.slice(0, 8)}
                       </Badge>
                       <span className="text-[9px] font-bold text-muted-foreground/40 uppercase">
                          {note.updatedAt ? format(note.updatedAt.toDate(), 'dd MMM') : '--'}
                       </span>
                    </div>

                    <div className="space-y-2 flex-grow overflow-hidden">
                       <h3 className="text-xl font-black tracking-tight leading-tight group-hover:text-primary transition-colors line-clamp-2">
                         {note.title || 'Untitled Objective'}
                       </h3>
                       <p className="text-xs text-muted-foreground/60 leading-relaxed line-clamp-5 font-medium">
                         {note.content || 'Awaiting mission intelligence data...'}
                       </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/10 mt-auto">
                       <div className="flex gap-1 overflow-hidden">
                          {(note.tags || []).slice(0, 2).map(tag => (
                            <span key={tag} className="text-[7px] font-black uppercase text-primary/40">#{tag}</span>
                          ))}
                          {(!note.tags || note.tags.length === 0) && (
                            <span className="text-[7px] font-black uppercase text-muted-foreground/20 italic">No Tags</span>
                          )}
                       </div>
                       <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg" onClick={(e) => {
                             e.stopPropagation();
                             handleDeleteNote(note.id);
                          }}>
                             <Trash2 className="w-3.5 h-3.5 text-muted-foreground/40 hover:text-destructive" />
                          </Button>
                          <Maximize2 className="w-4 h-4 text-primary" />
                       </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="relative mt-auto pt-24 pb-12 px-6 transition-colors duration-700 border-t glass border-border/40">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <Image src="/camly.png" alt="Camly" width={48} height={48} className="object-contain" />
                <h2 className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent uppercase font-roboto-slab">
                  CAMLY
                </h2>
              </div>
              <p className="text-sm leading-relaxed max-w-xs font-medium text-muted-foreground">
                Defining the standard for high-precision documentation. 
                Camly Inc's flagship engine for tactical insight capture and AI synthesis.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Operations</h3>
              <ul className="space-y-3 text-xs font-bold text-muted-foreground">
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
          <Separator className="mb-10 bg-border/40" />
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
