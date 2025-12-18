import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Document {
  id: string;
  name: string;
  icon: string;
  createdAt: number;
  updatedAt: number;
}

interface DocumentsState {
  documents: Document[];
  createDocument: (name: string, icon?: string) => Document;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  getDocument: (id: string) => Document | undefined;
  getAllDocuments: () => Document[];
}

export const useDocumentsStore = create<DocumentsState>()(
  persist(
    (set, get) => ({
      documents: [],

      createDocument: (name, icon = 'FolderOpen') => {
        const newDocument: Document = {
          id: crypto.randomUUID(),
          name,
          icon,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        set((state) => ({ documents: [...state.documents, newDocument] }));
        return newDocument;
      },

      updateDocument: (id, updates) => {
        set((state) => ({
          documents: state.documents.map((doc) =>
            doc.id === id ? { ...doc, ...updates, updatedAt: Date.now() } : doc
          ),
        }));
      },

      deleteDocument: (id) => {
        set((state) => ({ documents: state.documents.filter((doc) => doc.id !== id) }));
      },

      getDocument: (id) => {
        return get().documents.find((doc) => doc.id === id);
      },

      getAllDocuments: () => {
        return get().documents.sort((a, b) => a.name.localeCompare(b.name));
      },
    }),
    { name: 'notyqo-documents-storage' }
  )
);
