# LINK-INSTA - Site de présentation immobilière

Site web Next.js pour la présentation de contacts immobiliers avec liens personnalisés.

## 🚀 Déploiement rapide

Pour déployer sur Vercel via GitHub, utilisez le script automatisé :

```bash
./deploy.sh votre-username-github [nom-du-repo]
```

Exemple :
```bash
./deploy.sh matthisfoveau link-insta
```

### Avec token GitHub (création automatique du repo)

Si vous avez un token GitHub avec les permissions `repo` :

```bash
export GITHUB_TOKEN="votre_token_personnel"
./deploy.sh votre-username-github link-insta
```

Le script va :
1. ✅ Vérifier et commiter les fichiers
2. ✅ Créer automatiquement le repo GitHub (si token disponible)
3. ✅ Configurer le remote Git
4. ✅ Pousser le code vers GitHub
5. ✅ Donner les instructions pour connecter Vercel

### Sans token (création manuelle du repo)

1. Créez d'abord le repo sur https://github.com/new
2. Exécutez ensuite : `./deploy.sh votre-username link-insta`

## 📚 Documentation complète

Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour le guide complet de déploiement avec toutes les options.

## 🛠️ Développement local

```bash
cd app
npm install
npm run dev
```

## 📁 Structure du projet

```
LINK-INSTA/
├── app/                    # Application Next.js
│   ├── src/
│   │   ├── app/           # Routes Next.js
│   │   ├── components/    # Composants React
│   │   └── data/         # Données
│   └── public/            # Fichiers statiques
├── vercel.json            # Configuration Vercel
├── deploy.sh              # Script de déploiement
└── DEPLOYMENT.md          # Guide de déploiement
```

## ⚙️ Configuration Vercel

Le fichier `vercel.json` configure automatiquement :
- **Root Directory** : `app`
- **Build Command** : `cd app && npm install && npm run build`
- **Output Directory** : `app/.next`

Vercel détectera automatiquement Next.js et utilisera ces paramètres.

