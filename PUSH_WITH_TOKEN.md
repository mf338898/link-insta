# Pousser le code avec un Personal Access Token

Le repository GitHub existe maintenant ! Il ne reste plus qu'à pousser le code.

## Option 1 : Avec Personal Access Token (recommandé)

1. **Créez un token GitHub** :
   - Allez sur : https://github.com/settings/tokens
   - Cliquez sur "Generate new token" → "Generate new token (classic)"
   - Nom : `Vercel Deployment`
   - Permissions : Cochez `repo` (toutes les permissions repo)
   - Cliquez sur "Generate token"
   - **Copiez le token immédiatement** (il ne sera plus visible après)

2. **Utilisez le token pour pousser** :
   ```bash
   git push https://VOTRE_TOKEN@github.com/mf338898/link-insta.git main
   ```
   
   Remplacez `VOTRE_TOKEN` par le token que vous venez de créer.

## Option 2 : Stocker le token dans Git (plus pratique)

```bash
# Configurez Git pour utiliser votre token
git remote set-url origin https://VOTRE_TOKEN@github.com/mf338898/link-insta.git

# Puis poussez normalement
git push -u origin main
```

⚠️ **Attention** : Le token sera visible dans `.git/config`. Pour plus de sécurité, utilisez l'Option 3.

## Option 3 : Via credential helper (automatique)

```bash
# Git vous demandera vos identifiants une seule fois
git push -u origin main
```

Entrez :
- **Username** : `mf338898`
- **Password** : Collez votre **Personal Access Token** (pas votre mot de passe)

Git stockera les credentials dans le keychain macOS et vous ne devrez plus le faire.

## Après le push réussi

Une fois le code poussé, connectez Vercel :
1. Allez sur : https://vercel.com/new
2. Connectez GitHub
3. Sélectionnez : `mf338898/link-insta`
4. Cliquez sur "Deploy"

🎉 C'est tout !

