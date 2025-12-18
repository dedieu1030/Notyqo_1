# Troubleshooting - Notyqo Extension

## Problèmes Résolus

### ❌ L'app disparaît après ouverture
**Symptôme** : L'extension s'ouvre puis se ferme immédiatement.

**Cause** : Configuration en `default_popup` qui crée une popup temporaire.

**Solution** ✅ :
- Supprimé `default_popup` du manifest
- Ajouté `background.js` service worker
- L'app s'ouvre maintenant dans un nouvel onglet permanent

---

### ❌ Content script MIME type error
**Symptôme** : 
```
Invalid script mime type: 'Impossible de charger le fichier "src/content/quick-note.tsx"'
```

**Cause** : Les content scripts doivent être des fichiers JavaScript compilés, pas `.tsx`.

**Solution** ✅ :
- Configuration Vite avec entry point séparé pour content script
- Build du content script en JavaScript standalone
- Aucune dépendance externe (React/shadcn compilé inline)
- Fichier final : `content-script.js` (3.69 KB)

---

### ❌ React Error #185
**Symptôme** :
```
Uncaught Error: Minified React error #185
```

**Cause** : Le composant `Plate` de PlateJS nécessite un composant `PlateContent` pour rendre l'éditeur.

**Solution** ✅ :
```tsx
// ❌ Avant (div vide)
<Plate editor={editor}>
  <div className="prose" />
</Plate>

// ✅ Après (PlateContent)
<Plate editor={editor}>
  <PlateContent className="prose" />
</Plate>
```

---

## Erreurs Communes

### Extension ne se charge pas
**Vérifications** :
1. Builder l'extension : `npm run build`
2. Vérifier que `dist/manifest.json` existe
3. Vérifier que `dist/background.js` existe
4. Recharger l'extension dans `chrome://extensions/`

### PlateJS ne s'affiche pas
**Vérifications** :
1. Import correct de `PlateContent` :
   ```tsx
   import { Plate, PlateContent } from 'platejs/react';
   ```
2. Utilisation dans le JSX :
   ```tsx
   <Plate editor={editor}>
     <PlateContent />
   </Plate>
   ```

### Notes ne se sauvegardent pas
**Vérifications** :
1. Vérifier la console pour erreurs Zustand
2. Vérifier localStorage dans DevTools
3. Attendre 1 seconde (debounce auto-save)

### Quick Note ne s'affiche pas
**Vérifications** :
1. Vérifier que `content-script.js` existe dans `dist/`
2. Vérifier la console pour erreurs
3. Recharger la page web
4. Chercher le bouton 📝 en bas à droite

---

## Commandes Utiles

### Nettoyer et Rebuild
```bash
rm -rf dist node_modules package-lock.json
npm install
npm run build
```

### Vérifier les erreurs TypeScript
```bash
npm run build
# Toutes les erreurs TS apparaîtront avant le build Vite
```

### Dev Mode (pas pour extension)
```bash
npm run dev
# Ouvre http://localhost:5173/
# Utile pour développer les composants
```

### Inspecter l'extension
1. `chrome://extensions/` → Trouver Notyqo
2. Cliquer "Inspecter les vues" → "Service worker"
3. Console pour voir les erreurs background
4. Pour content script : F12 sur la page web

---

## Structure Build Attendue

```
dist/
├── index.html              # ✅ Page principale
├── manifest.json           # ✅ Manifest v3
├── background.js           # ✅ Service worker
├── content-script.js       # ✅ Content script standalone
├── vite.svg               # ✅ Icône
└── assets/
    ├── main-*.css         # ✅ Styles
    ├── main-*.js          # ✅ Code principal
    └── *.woff2            # ✅ Fonts Figtree
```

---

## Logs de Debug

### Content Script
```javascript
// Dans src/content/quick-note.tsx
console.log('Quick Note injected');
```

### Background Worker
```javascript
// Dans public/background.js
console.log('Background service worker active');
```

### Main App
```typescript
// Dans src/App.tsx
console.log('App mounted');
```

---

## Support

**Repo GitHub** : https://github.com/dedieu1030/Notyqo_1  
**Issues** : Ouvrir un issue sur GitHub avec :
- Description du problème
- Console errors (F12)
- Version Chrome
- Steps to reproduce

