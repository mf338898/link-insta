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
if git remote get-url origin &> /dev/null; then
    echo "✓ Remote 'origin' existe déjà"
    REMOTE_URL=$(git remote get-url origin)
    echo "   URL: $REMOTE_URL"
else
    # Créer le remote
    echo "🔗 Configuration du remote GitHub..."
    GITHUB_URL="https://github.com/$REPO_USER/$REPO_NAME.git"
    git remote add origin "$GITHUB_URL" 2>/dev/null || git remote set-url origin "$GITHUB_URL"
    echo "✓ Remote configuré: $GITHUB_URL"
fi

# Demander confirmation avant de pousser
echo ""
echo "⚠️  IMPORTANT: Assurez-vous que le repository existe sur GitHub!"
echo "   Si ce n'est pas le cas, créez-le d'abord sur: https://github.com/new"
echo ""
read -p "Continuer le push vers GitHub? (o/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Oo]$ ]]; then
    echo "❌ Déploiement annulé"
    exit 1
fi

# Push vers GitHub
echo "📤 Push vers GitHub..."
git push -u origin main || {
    echo ""
    echo "❌ Erreur lors du push. Le repository existe-t-il sur GitHub?"
    echo "   Créez-le ici: https://github.com/new"
    echo "   Nom suggéré: $REPO_NAME"
    exit 1
}

echo ""
echo "✅ Code poussé vers GitHub avec succès!"
echo ""
echo "🔗 Pour connecter à Vercel:"
echo "   1. Allez sur https://vercel.com/new"
echo "   2. Connectez votre compte GitHub"
echo "   3. Importez le repository: $REPO_USER/$REPO_NAME"
echo "   4. Vercel détectera automatiquement la configuration dans vercel.json"
echo ""
echo "   OU utilisez la CLI Vercel:"
echo "   npx vercel --prod"
echo ""

