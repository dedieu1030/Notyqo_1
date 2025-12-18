import { Plate, PlateContent, usePlateEditor } from 'platejs/react';
import { ParagraphPlugin } from 'platejs/react';
import { 
  BlockquotePlugin, 
  H1Plugin, 
  H2Plugin, 
  H3Plugin,
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  CodePlugin,
  StrikethroughPlugin
} from '@platejs/basic-nodes/react';
import { useNotesStore } from '@/stores/notes-store';
import { useEffect } from 'react';
import { TrailingBlockPlugin } from 'platejs';

const editorPlugins = [
  ParagraphPlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  BlockquotePlugin,
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  CodePlugin,
  StrikethroughPlugin,
  TrailingBlockPlugin,
];

export function SimplePlateEditor() {
  const activeNote = useNotesStore((state) => state.getActiveNote());
  const updateNote = useNotesStore((state) => state.updateNote);

  const editor = usePlateEditor({
    plugins: editorPlugins,
    value: activeNote?.content || [{ type: 'p', children: [{ text: '' }] }],
  });

  // Auto-save debounced
  useEffect(() => {
    if (!activeNote || !editor) return;
    
    const timeoutId = setTimeout(() => {
      try {
        const content = editor.children;
        updateNote(activeNote.id, { content });
      } catch (error) {
        console.error('Error saving note:', error);
      }
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [editor?.children, activeNote, updateNote]);

  if (!activeNote) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        <p>Select a note or create a new one to start editing</p>
      </div>
    );
  }

  return (
    <Plate editor={editor}>
      <div className="h-full overflow-auto p-8">
        <input
          type="text"
          value={activeNote.title}
          onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
          className="mb-4 w-full border-none bg-transparent text-3xl font-bold outline-none"
          placeholder="Untitled"
        />
        <PlateContent 
          className="prose dark:prose-invert max-w-none focus:outline-none" 
          placeholder="Start writing..."
        />
      </div>
    </Plate>
  );
}

