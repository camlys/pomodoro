"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, Search, Plus, Trash2, 
  FileText, Clock, ShieldCheck, 
  Terminal, Database, Globe, ChevronRight,
  ExternalLink, Twitter
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

type Note = {
  id: string;
  title: string;
  content: string;
  category: string;
  updatedAt: any;
};

export default function NotesEngine() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [isSaving, setIsSaving] = useState(false);
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
    if (selectedNoteId === id) setSelectedNoteId(null);
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
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
              <span className="text-[7px] font-bold tracking-[0.3em] text-primary/60 uppercase mt-1">camly.org</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/focus">
            <Button variant="ghost" size="sm" className="rounded-full text-xs gap-2">
              <ArrowLeft className="w-3 h-3" /> Back to Timer
            </Button>
          </Link>
        </div>
      </nav>

      <main className="flex-grow container max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-80 flex flex-col gap-4">
          <div className="glass-card !p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search logs..." 
                className="pl-10 h-10 bg-muted/50 border-border rounded-xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleCreateNote}
              className="w-full h-11 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg gap-2"
            >
              <Plus className="w-4 h-4" /> New Log
            </Button>
          </div>

          <div className="flex-grow glass-card !p-2 overflow-y-auto space-y-1 max-h-[500px] md:max-h-none">
             {filteredNotes.length === 0 && (
               <div className="p-12 text-center opacity-20">
                  <FileText className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-[10px] font-black uppercase tracking-widest">No Active Logs</p>
               </div>
             )}
             {filteredNotes.map((note) => (
               <button
                 key={note.id}
                 onClick={() => setSelectedNoteId(note.id)}
                 className={cn(
                   "w-full text-left p-4 rounded-2xl transition-all group border border-transparent",
                   selectedNoteId === note.id 
                    ? "bg-primary/10 border-primary/20" 
                    : "hover:bg-muted/50"
                 )}
               >
                 <div className="flex justify-between items-start mb-1">
                   <h3 className={cn("text-sm font-black truncate max-w-[140px]", selectedNoteId === note.id ? "text-primary" : "text-foreground")}>
                      {note.title || 'Untitled Log'}
                   </h3>
                   <span className="text-[8px] font-bold text-muted-foreground/60">
                      {note.updatedAt ? format(note.updatedAt.toDate(), 'HH:mm') : '--:--'}
                   </span>
                 </div>
                 <p className="text-[10px] text-muted-foreground line-clamp-1 opacity-60">
                    {note.content || 'Empty tactical summary...'}
                 </p>
               </button>
             ))}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-grow flex flex-col gap-4">
          {selectedNote ? (
            <div className="flex-grow glass-card !p-6 md:!p-10 flex flex-col gap-6 animate-in fade-in duration-500">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1 flex-grow">
                    <Input 
                      value={selectedNote.title}
                      onChange={(e) => handleUpdateNote(selectedNote.id, { title: e.target.value })}
                      className="text-2xl md:text-4xl font-black tracking-tighter bg-transparent border-none p-0 h-auto focus:ring-0 placeholder:text-muted-foreground/30"
                      placeholder="Mission Title"
                    />
                    <div className="flex items-center gap-4">
                       <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-primary/20 text-primary">
                          <Terminal className="w-3 h-3 mr-1.5" /> Log Sync Active
                       </Badge>
                       <span className="text-[10px] text-muted-foreground/60 font-bold uppercase flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> Updated {selectedNote.updatedAt ? format(selectedNote.updatedAt.toDate(), 'MMM dd, HH:mm') : 'just now'}
                       </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDeleteNote(selectedNote.id)}
                      className="w-10 h-10 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
               </div>

               <Separator className="bg-border/40" />

               <div className="flex-grow flex flex-col">
                  <Textarea 
                    value={selectedNote.content}
                    onChange={(e) => handleUpdateNote(selectedNote.id, { content: e.target.value })}
                    className="flex-grow bg-transparent border-none p-0 text-base md:text-lg font-medium leading-relaxed resize-none focus:ring-0 placeholder:text-muted-foreground/20"
                    placeholder="Capture deep-work insights here..."
                  />
               </div>

               <div className="flex items-center justify-between pt-6 border-t border-border/40">
                  <div className="flex items-center gap-3">
                     <div className={cn("w-2 h-2 rounded-full", isSaving ? "bg-accent animate-pulse" : "bg-primary")}></div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        {isSaving ? 'Syncing Coordinates...' : 'All Coordinates Saved'}
                     </span>
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary/60 flex items-center gap-2">
                     <ShieldCheck className="w-3.5 h-3.5" /> High-Parity Security Protocol
                  </div>
               </div>
            </div>
          ) : (
            <div className="flex-grow glass-card !p-12 border-dashed border-border/40 flex flex-col items-center justify-center text-center opacity-30">
               <div className="w-20 h-20 rounded-[2.5rem] bg-muted flex items-center justify-center mb-8">
                  <FileText className="w-10 h-10 text-muted-foreground" />
               </div>
               <h3 className="text-2xl font-black tracking-tight mb-3">No Log Selected</h3>
               <p className="text-sm font-medium max-w-xs leading-relaxed">Select an existing tactical log or initiate a new mission capture from the sidebar.</p>
            </div>
          )}
        </div>
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
                Defining the standard for high-precision documentation. 
                Camly Inc's flagship engine for tactical insight capture.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Operations</h3>
              <ul className="space-y-3 text-xs font-bold text-muted-foreground">
                <li className="hover:text-primary transition-colors flex items-center gap-2">
                   <ChevronRight className="w-3 h-3 opacity-30" />
                   <Link href="/focus">Pomodoro Timer</Link>
                </li>
                <li className="hover:text-primary transition-colors flex items-center gap-2">
                   <ChevronRight className="w-3 h-3 opacity-30" />
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
          <Separator className="mb-10 bg-border/60" />
          <p className="text-[10px] uppercase tracking-[0.5em] font-black text-muted-foreground/40 text-center">
            © 2024 Camly Inc • Defining High-Precision Velocity
          </p>
        </div>
      </footer>
    </div>
  );
}
