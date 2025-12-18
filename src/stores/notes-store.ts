import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Note {
  id: string;
  title: string;
  content: any[];
  createdAt: number;
  updatedAt: number;
  documentId?: string;
  isFavorite: boolean;
  isArchived: boolean;
  isDeleted: boolean;
}

interface NotesState {
  notes: Note[];
  activeNoteId: string | null;
  createNote: (title?: string) => Note;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  restoreNote: (id: string) => void;
  permanentlyDeleteNote: (id: string) => void;
  setActiveNote: (id: string | null) => void;
  getActiveNote: () => Note | null;
  getNotesByDocument: (documentId: string) => Note[];
  getRecentNotes: (limit?: number) => Note[];
  getFavoriteNotes: () => Note[];
  getDeletedNotes: () => Note[];
  searchNotes: (query: string) => Note[];
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      activeNoteId: null,

      createNote: (title = 'Untitled Note') => {
        const newNote: Note = {
          id: crypto.randomUUID(),
          title,
          content: [{ type: 'p', children: [{ text: '' }] }],
          createdAt: Date.now(),
          updatedAt: Date.now(),
          isFavorite: false,
          isArchived: false,
          isDeleted: false,
        };
        set((state) => ({ notes: [newNote, ...state.notes], activeNoteId: newNote.id }));
        return newNote;
      },

      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...updates, updatedAt: Date.now() } : note
          ),
        }));
      },

      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, isDeleted: true, updatedAt: Date.now() } : note
          ),
        }));
      },

      restoreNote: (id) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, isDeleted: false, updatedAt: Date.now() } : note
          ),
        }));
      },

      permanentlyDeleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
          activeNoteId: state.activeNoteId === id ? null : state.activeNoteId,
        }));
      },

      setActiveNote: (id) => set({ activeNoteId: id }),

      getActiveNote: () => {
        const { notes, activeNoteId } = get();
        return notes.find((note) => note.id === activeNoteId) || null;
      },

      getNotesByDocument: (documentId) => {
        return get().notes.filter(
          (note) => note.documentId === documentId && !note.isDeleted && !note.isArchived
        );
      },

      getRecentNotes: (limit = 20) => {
        return get()
          .notes.filter(
            (note) => !note.isDeleted && !note.isArchived && !note.isFavorite && !note.documentId
          )
          .sort((a, b) => b.updatedAt - a.updatedAt)
          .slice(0, limit);
      },

      getFavoriteNotes: () => {
        return get()
          .notes.filter((note) => note.isFavorite && !note.isDeleted)
          .sort((a, b) => b.updatedAt - a.updatedAt);
      },

      getDeletedNotes: () => {
        return get()
          .notes.filter((note) => note.isDeleted)
          .sort((a, b) => b.updatedAt - a.updatedAt);
      },

      searchNotes: (query) => {
        const lowerQuery = query.toLowerCase();
        return get().notes.filter(
          (note) =>
            !note.isDeleted &&
            (note.title.toLowerCase().includes(lowerQuery) ||
              JSON.stringify(note.content).toLowerCase().includes(lowerQuery))
        );
      },
    }),
    { name: 'notyqo-notes-storage' }
  )
);
