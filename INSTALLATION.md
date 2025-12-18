# Installation de l'Extension Notyqo

## 🚀 Installation Rapide

### 1. Build de l'extension

```bash
cd /Users/dedieu/Notyqo_1/notyqo-extension
npm install
npm run build
```

### 2. Charger dans Chrome

1. Ouvrir Chrome et aller à : `chrome://extensions/`
2. Activer le **"Mode développeur"** (toggle en haut à droite)
3. Cliquer sur **"Charger l'extension non empaquetée"**
4. Sélectionner le dossier : `/Users/dedieu/Notyqo_1/notyqo-extension/dist`

### 3. Utilisation

- **Cliquer sur l'icône de l'extension** dans la barre d'outils Chrome
- L'application s'ouvre dans un **nouvel onglet** (pas un popup)
- L'app reste ouverte et ne disparaît plus !

## 📝 Fonctionnalités Disponibles

### ✅ Opérationnel
- Création de notes avec éditeur PlateJS
- Sidebar collapsible avec navigation
- Auto-save (1 seconde de debounce)
- Thème light/dark/system
- Vue Corbeille (restauration/suppression)
- Vue Settings
- Vue Upgrade
- Persistance localStorage

### 🚧 En Développement
- Quick Note (content script)
- Toolbars PlateJS (Fixed/Floating)
- Plugins avancés (Table, Media, Link, etc.)
- Export DOCX/Markdown

## 🔧 Développement

```bash
# Serveur de développement
npm run dev
# Ouvre http://localhost:5173/

# Build de production
npm run build

# Linter
npm run lint
```

## ⚠️ Troubleshooting

### L'app disparaît après ouverture
✅ **RÉSOLU** : L'extension ouvre maintenant l'app dans un nouvel onglet au lieu d'un popup.

### Erreur de chargement dans Chrome
- Vérifier que le dossier `dist/` contient bien `manifest.json` et `background.js`
- Rebuild avec `npm run build`
- Recharger l'extension dans `chrome://extensions/`

### Erreurs de build
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📦 Structure du Build

```
dist/
├── index.html              # Application principale
├── manifest.json           # Chrome Extension Manifest v3
├── background.js           # Service worker
├── vite.svg               # Icône
└── assets/
    ├── index-*.css        # Styles (40 KB)
    ├── react-vendor-*.js  # React (11 KB)
    ├── plate-vendor-*.js  # PlateJS (289 KB)
    └── index-*.js         # App code (443 KB)
```

## 🎯 Prochaines Étapes

1. Tester l'extension dans Chrome
2. Créer quelques notes
3. Tester le thème light/dark
4. Vérifier la persistance (fermer/rouvrir Chrome)

---

**Repo GitHub** : https://github.com/dedieu1030/Notyqo_1  
**Version** : 1.0.0

