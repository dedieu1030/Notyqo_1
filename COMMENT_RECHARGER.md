# 🔄 COMMENT RECHARGER L'EXTENSION

## ⚠️ IMPORTANT : À FAIRE APRÈS CHAQUE BUILD

Après chaque `npm run build`, l'extension Chrome doit être rechargée !

### 📋 Procédure Simple (30 secondes)

1. **Ouvrir** : `chrome://extensions/` dans Chrome

2. **Trouver** : L'extension "Notyqo" dans la liste

3. **Cliquer** : Sur le bouton **🔄 de rechargement** (icône circulaire)
   - Il est à côté du toggle ON/OFF de l'extension

4. **Tester** : Cliquer sur l'icône Notyqo dans la barre d'outils
   - L'app devrait s'ouvrir dans un nouvel onglet

### 🎯 Checklist de Vérification

✅ Build terminé sans erreur : `npm run build`
✅ Fichier `dist/manifest.json` existe
✅ Extension rechargée dans Chrome
✅ Aucune erreur dans la console de l'extension
✅ L'app s'ouvre en cliquant sur l'icône

### 🔍 Si ça ne marche toujours pas

**Option 1 : Recharger complètement**
1. Aller à `chrome://extensions/`
2. Cliquer sur **"Supprimer"** (poubelle) pour Notyqo
3. Cliquer sur **"Charger l'extension non empaquetée"**
4. Sélectionner le dossier `dist/`

**Option 2 : Vérifier la console**
1. `chrome://extensions/`
2. Trouver Notyqo
3. Cliquer sur **"Inspecter les vues"** → **"Service worker"**
4. Vérifier les erreurs dans la console

**Option 3 : Test en dev**
```bash
# Ouvrir dans le navigateur normal
http://localhost:5175/
```
Si ça marche ici mais pas dans l'extension, c'est un problème de rechargement.

### 🐛 Debug

**Console de l'app**
- Ouvrir l'app Notyqo
- F12 pour ouvrir DevTools
- Chercher "Notyqo App mounted" dans la console
- Vérifier les erreurs

**Console du background worker**
- `chrome://extensions/`
- "Inspecter les vues" → "Service worker"
- Vérifier les logs

### ⚡ Raccourci

Créer un script pour build + reload automatique :

```bash
# Ajouter dans package.json
"reload": "npm run build && echo '✅ Build OK! Maintenant recharger manuellement dans chrome://extensions/'"
```

Puis :
```bash
npm run reload
```

---

**Note** : Chrome ne peut pas recharger automatiquement. Il faut **toujours** cliquer sur 🔄 manuellement.

