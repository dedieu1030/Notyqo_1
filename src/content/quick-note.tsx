// Quick Note Content Script - Simplified sidebar for quick notes
import { createRoot } from 'react-dom/client';
import { Button } from '../components/ui/button';
import '../index.css';

// Simple Quick Note Component
function QuickNote() {
  const toggleSidebar = () => {
    const sidebar = document.getElementById('notyqo-quick-note');
    if (sidebar) {
      sidebar.classList.toggle('notyqo-hidden');
    }
  };

  return (
    <div
      id="notyqo-quick-note"
      className="notyqo-sidebar"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '320px',
        height: '100vh',
        background: 'white',
        boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
        zIndex: 2147483647,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>
          Quick Note
        </h2>
        <Button onClick={toggleSidebar}>Close</Button>
      </div>
      <div style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
        <textarea
          placeholder="Take a quick note..."
          style={{
            width: '100%',
            minHeight: '200px',
            padding: '12px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            resize: 'vertical',
          }}
        />
      </div>
      <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb' }}>
        <Button className="w-full">Save Note</Button>
      </div>
    </div>
  );
}

// Inject Quick Note into page
function injectQuickNote() {
  const container = document.createElement('div');
  container.id = 'notyqo-quick-note-container';
  document.body.appendChild(container);
  
  const root = createRoot(container);
  root.render(<QuickNote />);

  // Add toggle button
  const toggleButton = document.createElement('button');
  toggleButton.innerHTML = '📝';
  toggleButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #000;
    color: #fff;
    border: none;
    font-size: 24px;
    cursor: pointer;
    z-index: 2147483646;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  toggleButton.onclick = () => {
    const sidebar = document.getElementById('notyqo-quick-note');
    if (sidebar) {
      sidebar.classList.toggle('notyqo-hidden');
    }
  };
  document.body.appendChild(toggleButton);
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectQuickNote);
} else {
  injectQuickNote();
}

