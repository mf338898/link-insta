# Guide de déploiement sur Vercel via GitHub

Ce projet est configuré pour être déployé automatiquement sur Vercel via GitHub.

## Configuration actuelle

- ✅ Configuration Vercel (`vercel.json`) - Le projet Next.js est dans le dossier `app/`
- ✅ Fichiers Git commités et prêts
- ⚠️  Remote GitHub à configurer

## Option 1 : Déploiement automatique avec le script

Si vous avez un token GitHub personnel avec les permissions `repo`, vous pouvez utiliser le script automatisé :

```bash
# Méthode 1 : Avec token GitHub (automatique)
export GITHUB_TOKEN="votre_token_github"
./deploy.sh votre-username link-insta

# Méthode 2 : Sans token (créer le repo manuellement d'abord)
./deploy.sh votre-username link-insta
```

## Option 2 : Déploiement manuel étape par étape

### Étape 1 : Créer le repository GitHub

1. Allez sur https://github.com/new
2. Nom du repository : `link-insta` (ou autre nom de votre choix)
3. Choisissez **Public** ou **Private**
4. ⚠️  **NE PAS** initialiser avec README, .gitignore ou licence (le repo existe déjà)
5. Cliquez sur **Create repository**

### Étape 2 : Connecter le repo local à GitHub

```bash
# Remplacer VOTRE_USERNAME et REPO_NAME par vos valeurs
git remote add origin https://github.com/VOTRE_USERNAME/REPO_NAME.git

# Vérifier
git remote -v
```

### Étape 3 : Pousser le code vers GitHub

```bash
git push -u origin main
```

Si vous rencontrez une erreur, vous devrez peut-être d'abord pull et merge :

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Étape 4 : Connecter à Vercel

1. Allez sur https://vercel.com/new
2. Cliquez sur **Continue with GitHub** (ou connectez votre compte GitHub)
3. Dans la liste des repositories, trouvez et sélectionnez `VOTRE_USERNAME/REPO_NAME`
4. Cliquez sur **Import**

Vercel détectera automatiquement :
- ✅ Framework : Next.js
- ✅ Root Directory : `app` (grâce à `vercel.json`)
- ✅ Build Settings : Automatiques

5. Cliquez sur **Deploy**

### Étape 5 : Configuration Vercel (si nécessaire)

Vercel devrait détecter automatiquement la configuration depuis `vercel.json` :
- Root Directory : `app`
- Build Command : `cd app && npm install && npm run build`
- Output Directory : `app/.next`

Si ce n'est pas le cas, dans les paramètres du projet Vercel :
1. Allez dans **Settings** → **General**
2. Root Directory : sélectionnez `app` dans le menu déroulant
3. Sauvegardez

## Option 3 : Utiliser Vercel CLI (si npm est disponible)

```bash
# Installer Vercel CLI (si pas déjà installé)
npm i -g vercel

# Se connecter à Vercel
vercel login

# Lier le projet (créera aussi le repo GitHub si nécessaire)
vercel link

# Déployer
vercel --prod
```

## Vérification du déploiement

Une fois déployé, vous obtiendrez :
- ✅ Une URL de production (ex: `votre-projet.vercel.app`)
- ✅ Des déploiements automatiques à chaque push sur `main`
- ✅ Des URLs de preview pour chaque Pull Request

## Dépannage

### Erreur : "Repository not found"
- Vérifiez que le repository existe sur GitHub
- Vérifiez que vous avez les bonnes permissions
- Vérifiez l'URL du remote : `git remote -v`

### Erreur : "Build failed"
- Vérifiez que tous les fichiers sont bien commités
- Vérifiez les logs de build sur Vercel
- Vérifiez que `vercel.json` est à la racine du repo

### Le build fonctionne mais le site ne charge pas
- Vérifiez que Root Directory est bien configuré sur `app` dans Vercel
- Vérifiez les logs de runtime sur Vercel

## Support

Pour toute question :
- Documentation Vercel : https://vercel.com/docs
- Documentation Next.js : https://nextjs.org/docs

