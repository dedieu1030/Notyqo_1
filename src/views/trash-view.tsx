import { useNotesStore } from '@/stores/notes-store';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

export function TrashView() {
  const deletedNotes = useNotesStore((state) => state.getDeletedNotes());
  const restoreNote = useNotesStore((state) => state.restoreNote);
  const permanentlyDeleteNote = useNotesStore((state) => state.permanentlyDeleteNote);

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Trash</h1>
      <div className="space-y-4">
        {deletedNotes.length === 0 ? (
          <p className="text-muted-foreground">No deleted notes</p>
        ) : (
          deletedNotes.map((note) => (
            <div key={note.id} className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <h3 className="font-semibold">{note.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Deleted {formatDistanceToNow(note.updatedAt, { addSuffix: true })}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => restoreNote(note.id)}>
                  Restore
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => permanentlyDeleteNote(note.id)}
                >
                  Delete Forever
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

