// Quick Note Content Script - Simplified version without external dependencies
// This runs as a content script injected into web pages

/// <reference types="chrome"/>

function injectQuickNote() {
  // Create container
  const container = document.createElement('div');
  container.id = 'notyqo-quick-note-container';
  container.style.cssText = `
    position: fixed;
    top: 0;
    right: -320px;
    width: 320px;
    height: 100vh;
    background: white;
    box-shadow: -2px 0 8px rgba(0,0,0,0.1);
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    transition: right 0.3s ease;
    font-family: system-ui, -apple-system, sans-serif;
  `;
  container.classList.add('notyqo-hidden');

  // Header
  const header = document.createElement('div');
  header.style.cssText = `
    padding: 16px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
  
  const title = document.createElement('h2');
  title.textContent = 'Quick Note';
  title.style.cssText = `
    font-weight: bold;
    font-size: 18px;
    margin: 0;
  `;
  
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕';
  closeBtn.style.cssText = `
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
  `;
  closeBtn.onmouseover = () => closeBtn.style.background = '#f3f4f6';
  closeBtn.onmouseout = () => closeBtn.style.background = 'transparent';
  closeBtn.onclick = () => toggleSidebar();
  
  header.appendChild(title);
  header.appendChild(closeBtn);

  // Content area
  const content = document.createElement('div');
  content.style.cssText = `
    flex: 1;
    padding: 16px;
    overflow: auto;
  `;
  
  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Take a quick note...';
  textarea.style.cssText = `
    width: 100%;
    min-height: 200px;
    padding: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    resize: vertical;
    font-family: inherit;
    font-size: 14px;
  `;
  
  content.appendChild(textarea);

  // Footer
  const footer = document.createElement('div');
  footer.style.cssText = `
    padding: 16px;
    border-top: 1px solid #e5e7eb;
    display: flex;
    gap: 8px;
  `;
  
  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save Note';
  saveBtn.style.cssText = `
    flex: 1;
    padding: 8px 16px;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
  `;
  saveBtn.onmouseover = () => saveBtn.style.background = '#333';
  saveBtn.onmouseout = () => saveBtn.style.background = '#000';
  saveBtn.onclick = () => {
    const noteContent = textarea.value;
    if (noteContent.trim()) {
      // Save to localStorage
      const notes = JSON.parse(localStorage.getItem('notyqo-quick-notes') || '[]');
      notes.push({
        id: Date.now(),
        content: noteContent,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('notyqo-quick-notes', JSON.stringify(notes));
      textarea.value = '';
      alert('Note saved!');
    }
  };
  
  const openAppBtn = document.createElement('button');
  openAppBtn.textContent = 'Open App';
  openAppBtn.style.cssText = `
    padding: 8px 16px;
    background: #fff;
    color: #000;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
  `;
  openAppBtn.onmouseover = () => openAppBtn.style.background = '#f9fafb';
  openAppBtn.onmouseout = () => openAppBtn.style.background = '#fff';
  openAppBtn.onclick = () => {
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      chrome.runtime.sendMessage({ action: 'openFullApp' });
    }
  };
  
  footer.appendChild(saveBtn);
  footer.appendChild(openAppBtn);

  // Assemble
  container.appendChild(header);
  container.appendChild(content);
  container.appendChild(footer);
  document.body.appendChild(container);

  // Toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.innerHTML = '📝';
  toggleBtn.style.cssText = `
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
    transition: transform 0.2s;
  `;
  toggleBtn.onmouseover = () => toggleBtn.style.transform = 'scale(1.1)';
  toggleBtn.onmouseout = () => toggleBtn.style.transform = 'scale(1)';
  toggleBtn.onclick = () => toggleSidebar();
  document.body.appendChild(toggleBtn);

  function toggleSidebar() {
    if (container.classList.contains('notyqo-hidden')) {
      container.style.right = '0';
      container.classList.remove('notyqo-hidden');
    } else {
      container.style.right = '-320px';
      container.classList.add('notyqo-hidden');
    }
  }
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectQuickNote);
} else {
  injectQuickNote();
}

// Export empty to make it a module
export {};
