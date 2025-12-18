// Background service worker for Notyqo extension
chrome.action.onClicked.addListener(() => {
  // Open the app in a new tab when extension icon is clicked
  chrome.tabs.create({
    url: chrome.runtime.getURL('index.html')
  });
});

