#!/bin/bash

# Script de déploiement automatique vers GitHub et Vercel
# Usage: ./deploy.sh [username] [repo-name]

set -e

REPO_USER=${1:-""}
REPO_NAME=${2:-"link-insta"}

if [ -z "$REPO_USER" ]; then
    echo "❌ Usage: ./deploy.sh <github-username> [repo-name]"
    echo "   Exemple: ./deploy.sh matthisfoveau link-insta"
    exit 1
fi

echo "🚀 Déploiement du projet vers GitHub et Vercel"
echo "   Utilisateur: $REPO_USER"
echo "   Repository: $REPO_NAME"
echo ""

# Vérifier que nous sommes dans le bon dossier
if [ ! -f "vercel.json" ]; then
    echo "❌ Erreur: vercel.json introuvable. Êtes-vous dans le bon dossier?"
    exit 1
fi

# Vérifier l'état Git
if ! git status &> /dev/null; then
    echo "❌ Erreur: Ce n'est pas un dépôt Git"
    exit 1
fi

# Ajouter tous les fichiers si nécessaire
echo "📦 Vérification des fichiers..."
git add -A || true

# Commit si nécessaire
if ! git diff --staged --quiet || ! git diff --quiet; then
    echo "💾 Création d'un commit..."
    git commit -m "Prepare for Vercel deployment" || true
fi

# Vérifier si le remote existe déjà
GITHUB_URL="https://github.com/$REPO_USER/$REPO_NAME.git"
if git remote get-url origin &> /dev/null; then
    echo "✓ Remote 'origin' existe déjà"
    REMOTE_URL=$(git remote get-url origin)
    echo "   URL: $REMOTE_URL"
    # Mettre à jour si différent
    if [ "$REMOTE_URL" != "$GITHUB_URL" ]; then
        git remote set-url origin "$GITHUB_URL"
        echo "✓ Remote mis à jour: $GITHUB_URL"
    fi
else
    # Créer le remote
    echo "🔗 Configuration du remote GitHub..."
    git remote add origin "$GITHUB_URL"
    echo "✓ Remote configuré: $GITHUB_URL"
fi

# Essayer de créer le repo GitHub automatiquement si un token est disponible
GITHUB_TOKEN=${GITHUB_TOKEN:-""}
if [ -n "$GITHUB_TOKEN" ]; then
    echo "🔍 Vérification de l'existence du repository sur GitHub..."
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        "https://api.github.com/repos/$REPO_USER/$REPO_NAME")
    
    if [ "$HTTP_CODE" = "404" ]; then
        echo "📦 Création du repository GitHub..."
        RESPONSE=$(curl -s -w "\n%{http_code}" \
            -X POST \
            -H "Authorization: token $GITHUB_TOKEN" \
            -H "Accept: application/vnd.github.v3+json" \
            -d "{\"name\":\"$REPO_NAME\",\"private\":false,\"auto_init\":false}" \
            "https://api.github.com/user/repos")
        
        HTTP_CODE_CREATE=$(echo "$RESPONSE" | tail -1)
        if [ "$HTTP_CODE_CREATE" = "201" ] || [ "$HTTP_CODE_CREATE" = "200" ]; then
            echo "✅ Repository créé avec succès sur GitHub!"
        else
            echo "⚠️  Impossible de créer le repository automatiquement (HTTP $HTTP_CODE_CREATE)"
            echo "   Créez-le manuellement sur: https://github.com/new"
        fi
    elif [ "$HTTP_CODE" = "200" ]; then
        echo "✅ Repository existe déjà sur GitHub"
    else
        echo "⚠️  Erreur lors de la vérification (HTTP $HTTP_CODE)"
        echo "   Le repository pourrait ne pas exister. Créez-le sur: https://github.com/new"
    fi
else
    echo "⚠️  GITHUB_TOKEN non défini - création manuelle nécessaire"
    echo "   Créez le repository sur: https://github.com/new"
    echo "   Nom: $REPO_NAME"
fi

# Push vers GitHub
echo ""
echo "📤 Push vers GitHub..."
if git push -u origin main 2>&1; then
    echo "✅ Code poussé vers GitHub avec succès!"
else
    PUSH_ERROR=$?
    echo ""
    echo "❌ Erreur lors du push (code: $PUSH_ERROR)"
    echo ""
    echo "Solutions possibles:"
    echo "   1. Vérifiez que le repository existe sur GitHub: https://github.com/$REPO_USER/$REPO_NAME"
    echo "   2. Créez-le ici si nécessaire: https://github.com/new"
    echo "   3. Vérifiez vos permissions GitHub"
    echo "   4. Essayez: git push -u origin main --force (si vous êtes sûr)"
    exit $PUSH_ERROR
fi

echo ""
echo "✅ Code poussé vers GitHub avec succès!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔗 PROCHAINES ÉTAPES : Connecter à Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Méthode 1 : Via l'interface web (recommandé)"
echo "   1. Allez sur: https://vercel.com/new"
echo "   2. Cliquez sur 'Continue with GitHub'"
echo "   3. Autorisez Vercel à accéder à vos repos"
echo "   4. Sélectionnez le repository: $REPO_USER/$REPO_NAME"
echo "   5. Vercel détectera automatiquement:"
echo "      - Framework: Next.js"
echo "      - Root Directory: app (depuis vercel.json)"
echo "   6. Cliquez sur 'Deploy'"
echo ""
echo "Méthode 2 : Via CLI Vercel"
echo "   npx vercel login"
echo "   npx vercel link"
echo "   npx vercel --prod"
echo ""
echo "📖 Documentation complète: voir DEPLOYMENT.md"
echo ""

