# Configuration des variables d'environnement Vercel

Ce guide explique comment configurer les variables d'environnement nécessaires pour les formulaires email sur Vercel.

## Variables requises

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=foveaumatthis0@gmail.com
SMTP_PASS=qtdzjiqwsntpljwz
NOTIFY_TO=foveaumatthis0@gmail.com
```

## Méthode 1 : Via l'interface web Vercel (Recommandé)

### Étape 1 : Accéder aux paramètres du projet

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet (par exemple `link-insta`)
3. Cliquez sur l'onglet **Settings** dans le menu de gauche

### Étape 2 : Ajouter les variables d'environnement

1. Dans le menu de gauche, cliquez sur **Environment Variables**
2. Pour chaque variable ci-dessous, cliquez sur **Add New** :

#### Variable 1 : SMTP_HOST
- **Key**: `SMTP_HOST`
- **Value**: `smtp.gmail.com`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Cliquez sur **Save**

#### Variable 2 : SMTP_PORT
- **Key**: `SMTP_PORT`
- **Value**: `465`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Cliquez sur **Save**

#### Variable 3 : SMTP_SECURE
- **Key**: `SMTP_SECURE`
- **Value**: `true`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Cliquez sur **Save**

#### Variable 4 : SMTP_USER
- **Key**: `SMTP_USER`
- **Value**: `foveaumatthis0@gmail.com`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Cliquez sur **Save**

#### Variable 5 : SMTP_PASS
- **Key**: `SMTP_PASS`
- **Value**: `qtdzjiqwsntpljwz`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Cliquez sur **Save**

#### Variable 6 : NOTIFY_TO
- **Key**: `NOTIFY_TO`
- **Value**: `foveaumatthis0@gmail.com`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Cliquez sur **Save**

### Étape 3 : Redéployer le projet

Après avoir ajouté toutes les variables :

1. Allez dans l'onglet **Deployments**
2. Trouvez le dernier déploiement
3. Cliquez sur les trois points (⋯) à droite
4. Sélectionnez **Redeploy**
5. Confirmez le redéploiement

**OU** simplement faites un nouveau push sur votre branche principale :

```bash
git commit --allow-empty -m "Trigger redeploy for env vars"
git push
```

## Méthode 2 : Via Vercel CLI (Script automatisé)

### Installation de Vercel CLI (si nécessaire)

```bash
npm install -g vercel
```

### Connexion à Vercel

```bash
vercel login
```

### Lier le projet (si pas déjà fait)

```bash
cd /Users/matthisfoveau/CURSOR-DOC/LINK-INSTA
vercel link
```

### Utiliser le script automatisé

```bash
./setup-vercel-env.sh
```

Le script va :
1. Vérifier votre connexion Vercel
2. Configurer automatiquement toutes les variables
3. Les appliquer aux environnements Production, Preview et Development

### Configuration manuelle via CLI

Si vous préférez configurer manuellement :

```bash
# Pour chaque variable, exécutez :
vercel env add SMTP_HOST production
# Puis entrez: smtp.gmail.com
# Répétez pour preview et development

vercel env add SMTP_PORT production
# Puis entrez: 465
# Répétez pour preview et development

vercel env add SMTP_SECURE production
# Puis entrez: true
# Répétez pour preview et development

vercel env add SMTP_USER production
# Puis entrez: foveaumatthis0@gmail.com
# Répétez pour preview et development

vercel env add SMTP_PASS production
# Puis entrez: qtdzjiqwsntpljwz
# Répétez pour preview et development

vercel env add NOTIFY_TO production
# Puis entrez: foveaumatthis0@gmail.com
# Répétez pour preview et development
```

## Vérification

Pour vérifier que les variables sont bien configurées :

1. Via l'interface web : Allez dans **Settings** → **Environment Variables**
2. Via CLI : `vercel env ls`

## Dépannage

### Les emails ne partent pas après configuration

1. Vérifiez que toutes les variables sont bien définies dans Vercel
2. Assurez-vous d'avoir redéployé le projet après avoir ajouté les variables
3. Vérifiez les logs de déploiement dans Vercel pour voir s'il y a des erreurs
4. Testez avec un formulaire pour voir les logs dans **Deployments** → **Functions** → Logs

### Erreur "SMTP configuration is incomplete"

Cette erreur signifie qu'une ou plusieurs variables d'environnement sont manquantes. Vérifiez :
- Que toutes les variables sont bien configurées dans Vercel
- Que le projet a été redéployé après l'ajout des variables
- Les logs de déploiement pour plus de détails

## Sécurité

⚠️ **Important** : Les variables d'environnement sont chiffrées au repos sur Vercel, mais :
- Ne partagez jamais vos credentials SMTP publiquement
- Ne les commitez pas dans votre repository Git
- Utilisez uniquement des mots de passe d'application Gmail (pas votre mot de passe principal)

Le fichier `.env.example` n'est pas commité (dans `.gitignore`), ce qui est correct.

