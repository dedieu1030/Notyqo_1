import { Edit, Search, FolderOpen, Trash2, Settings, CreditCard, Moon, Sun, Monitor } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useNotesStore } from '@/stores/notes-store';
import { useTheme } from '@/hooks/use-theme';

export function AppSidebar() {
  const createNote = useNotesStore((state) => state.createNote);
  const recentNotes = useNotesStore((state) => state.getRecentNotes(10));
  const setActiveNote = useNotesStore((state) => state.setActiveNote);
  const activeNoteId = useNotesStore((state) => state.activeNoteId);
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">Notyqo</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            className="h-8 w-8"
          >
            {theme === 'light' && <Sun className="h-4 w-4" />}
            {theme === 'dark' && <Moon className="h-4 w-4" />}
            {theme === 'system' && <Monitor className="h-4 w-4" />}
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => createNote()}>
                  <Edit className="h-4 w-4" />
                  <span>New Note</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Recent Notes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentNotes.map((note) => (
                <SidebarMenuItem key={note.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveNote(note.id)}
                    isActive={activeNoteId === note.id}
                  >
                    <span className="truncate">{note.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FolderOpen className="h-4 w-4" />
                  <span>Documents</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Trash2 className="h-4 w-4" />
                  <span>Trash</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <CreditCard className="h-4 w-4" />
              <span>Upgrade</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

