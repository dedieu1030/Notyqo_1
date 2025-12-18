import { useSettingsStore } from '@/stores/settings-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SettingsView() {
  const username = useSettingsStore((state) => state.username);
  const setUsername = useSettingsStore((state) => state.setUsername);
  const editorFontSize = useSettingsStore((state) => state.editorFontSize);
  const setEditorFontSize = useSettingsStore((state) => state.setEditorFontSize);

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Settings</h1>
      <div className="max-w-2xl space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">Username</label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            Editor Font Size: {editorFontSize}px
          </label>
          <input
            type="range"
            min="12"
            max="24"
            value={editorFontSize}
            onChange={(e) => setEditorFontSize(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <Button>Save Settings</Button>
      </div>
    </div>
  );
}

