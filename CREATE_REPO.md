# Créer le repository GitHub

Le remote est déjà configuré, mais le repository n'existe pas encore sur GitHub.

## Étapes rapides

1. **Allez sur** : https://github.com/new

2. **Remplissez le formulaire** :
   - Repository name : `link-insta`
   - Description (optionnel) : "Site de présentation immobilière"
   - Visibilité : **Public** ou **Private** (votre choix)
   - ⚠️ **IMPORTANT** : Ne cochez **AUCUNE** case :
     - ❌ Ne pas cocher "Add a README file"
     - ❌ Ne pas cocher "Add .gitignore"
     - ❌ Ne pas cocher "Choose a license"
   
   Le repo doit être **complètement vide** car nous allons y pousser notre code existant.

3. **Cliquez sur "Create repository"**

4. **Une fois créé, revenez ici et exécutez** :
   ```bash
   git push -u origin main
   ```

   GitHub vous demandera vos identifiants. Vous pouvez utiliser :
   - Votre nom d'utilisateur : `mf338898`
   - Un Personal Access Token (recommandé) au lieu du mot de passe
   
   Pour créer un token : https://github.com/settings/tokens
   (Permissions nécessaires : `repo`)

5. **Après le push, connectez à Vercel** :
   - Allez sur : https://vercel.com/new
   - Connectez votre compte GitHub
   - Sélectionnez le repository `mf338898/link-insta`
   - Cliquez sur "Deploy"

C'est tout ! 🚀

