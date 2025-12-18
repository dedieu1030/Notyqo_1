# Notyqo - Extension Chrome Dual-Space

Extension Chrome de prise de notes avec éditeur riche basé sur PlateJS et shadcn/ui (preset Nova).

## 🚀 Caractéristiques

### Architecture Dual-Space
- **Quick Note** : Sidebar minimaliste intégrée dans les pages web (content script)
- **Full App** : Application complète avec sidebar-07, navigation et éditeur avancé

### Stack Technique
- **Frontend** : React 18.3, TypeScript 5.x, Vite 7.x
- **UI** : shadcn/ui (preset Nova), Tailwind CSS 3.x, Lucide icons, Figtree font
- **Éditeur** : PlateJS 52.x avec support pour:
  - Blocs: Paragraphes, Titres H1-H6, Blockquotes, Code blocks
  - Formatage: Bold, Italic, Underline, Strikethrough, Code inline
  - Listes: Numérotées, à puces, todo lists
  - Plus: Tables, Images, Links, etc.
- **State** : Zustand avec persistance localStorage
- **Dates** : date-fns

### Stores Zustand
- **Notes Store** : Gestion CRUD des notes, recherche, filtres
- **Documents Store** : Organisation hiérarchique
- **Settings Store** : Thème (light/dark/system), préférences utilisateur

### Vues
- **Editor View** : Éditeur principal PlateJS avec auto-save (1s debounce)
- **Trash View** : Corbeille avec restauration/suppression définitive
- **Settings View** : Configuration utilisateur
- **Upgrade View** : Comparaison plans Free/Premium

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Développement
npm run dev

# Build de production
npm run build
```

## 🔧 Charger l'extension dans Chrome

1. Builder l'extension : `npm run build`
2. Ouvrir Chrome et aller à `chrome://extensions/`
3. Activer le "Mode développeur" (en haut à droite)
4. Cliquer sur "Charger l'extension non empaquetée"
5. Sélectionner le dossier `dist/`

## 🎨 Thème Personnalisé

Palette de couleurs raffinée inspirée du papier parchemin :
- **Parchment** : Tons neutres doux
- **Dust Grey** : Gris poudré
- **Linen** : Beige lin
- **Powder Petal** : Rose poudré
- **Almond Silk** : Beige amande

## 📝 Utilisation

### Full App
1. Cliquer sur l'icône de l'extension dans Chrome
2. L'application s'ouvre avec la sidebar collapsible
3. Créer des notes avec "New Note"
4. Éditer avec l'éditeur PlateJS
5. Les notes sont auto-sauvegardées

### Quick Note (à venir)
1. Un bouton flottant apparaît sur toutes les pages web
2. Cliquer pour ouvrir la sidebar Quick Note
3. Prendre des notes rapides pendant la navigation

## 🏗️ Structure du Projet

```
src/
├── components/
│   ├── ui/              # Composants shadcn/ui
│   ├── app-sidebar.tsx  # Sidebar principale
│   └── editor/          # Éditeur PlateJS
├── stores/              # Zustand stores
│   ├── notes-store.ts
│   ├── documents-store.ts
│   └── settings-store.ts
├── views/               # Vues de l'application
│   ├── trash-view.tsx
│   ├── settings-view.tsx
│   └── upgrade-view.tsx
├── hooks/               # React hooks
│   └── use-theme.ts
├── content/             # Content scripts
│   └── quick-note.tsx
└── App.tsx             # Application principale
```

## 🔐 Permissions Chrome

- `storage` : Sauvegarde locale des notes
- `activeTab` : Accès à l'onglet actif
- `scripting` : Injection du Quick Note

## 📄 License

Propriétaire - Version 1.0.0

## 🚧 Développement Futur

- [ ] Implémenter tous les kits PlateJS spécifiés
- [ ] Ajouter Fixed/Floating Toolbars
- [ ] Export DOCX/Markdown
- [ ] Synchronisation cloud
- [ ] Collaboration en temps réel
