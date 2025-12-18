import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SimplePlateEditor } from '@/components/editor/simple-plate-editor';
import { useTheme } from '@/hooks/use-theme';
import { useEffect } from 'react';

function App() {
  useTheme();

  useEffect(() => {
    console.log('Notyqo App mounted');
  }, []);

  return (
    <div className="min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger />
            </div>
          </header>
          <div className="flex flex-1 flex-col">
            <SimplePlateEditor />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default App;
