import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';
export type Plan = 'free' | 'premium';

interface SettingsState {
  theme: Theme;
  plan: Plan;
  autoSaveDelay: number;
  username: string;
  avatarUrl?: string;
  editorFontSize: number;
  editorLineHeight: number;
  setTheme: (theme: Theme) => void;
  setPlan: (plan: Plan) => void;
  setAutoSaveDelay: (delay: number) => void;
  setUsername: (username: string) => void;
  setAvatarUrl: (url: string) => void;
  setEditorFontSize: (size: number) => void;
  setEditorLineHeight: (height: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      plan: 'free',
      autoSaveDelay: 1000,
      username: 'User',
      editorFontSize: 16,
      editorLineHeight: 1.6,

      setTheme: (theme) => set({ theme }),
      setPlan: (plan) => set({ plan }),
      setAutoSaveDelay: (delay) => set({ autoSaveDelay: delay }),
      setUsername: (username) => set({ username }),
      setAvatarUrl: (url) => set({ avatarUrl: url }),
      setEditorFontSize: (size) => set({ editorFontSize: size }),
      setEditorLineHeight: (height) => set({ editorLineHeight: height }),
    }),
    { name: 'notyqo-settings-storage' }
  )
);
