#!/bin/bash

# Script pour configurer les variables d'environnement Vercel
# Usage: ./setup-vercel-env.sh

set -e

echo "🔐 Configuration des variables d'environnement Vercel"
echo ""

# Vérifier si Vercel CLI est installé
if ! command -v vercel &> /dev/null && ! command -v npx &> /dev/null; then
    echo "❌ Vercel CLI n'est pas installé."
    echo "   Installez-le avec: npm install -g vercel"
    echo "   Ou utilisez npx: npx vercel --version"
    exit 1
fi

# Variables d'environnement à configurer
declare -A ENV_VARS=(
    ["SMTP_HOST"]="smtp.gmail.com"
    ["SMTP_PORT"]="465"
    ["SMTP_SECURE"]="true"
    ["SMTP_USER"]="foveaumatthis0@gmail.com"
    ["SMTP_PASS"]="qtdzjiqwsntpljwz"
    ["NOTIFY_TO"]="foveaumatthis0@gmail.com"
)

echo "Les variables suivantes seront configurées :"
for key in "${!ENV_VARS[@]}"; do
    if [ "$key" = "SMTP_PASS" ]; then
        echo "  - $key = *** (masqué)"
    else
        echo "  - $key = ${ENV_VARS[$key]}"
    fi
done
echo ""

# Vérifier si l'utilisateur est connecté à Vercel
echo "📋 Vérification de la connexion Vercel..."
if command -v vercel &> /dev/null; then
    VERCEL_CMD="vercel"
else
    VERCEL_CMD="npx vercel"
fi

# Essayer de lister les projets pour vérifier la connexion
if ! $VERCEL_CMD ls &> /dev/null; then
    echo "⚠️  Vous n'êtes pas connecté à Vercel."
    echo ""
    echo "Connexion à Vercel..."
    $VERCEL_CMD login
fi

# Vérifier si le projet est lié
if [ ! -f ".vercel/project.json" ]; then
    echo "⚠️  Le projet n'est pas encore lié à Vercel."
    echo ""
    echo "Liaison du projet..."
    $VERCEL_CMD link
fi

# Lire les informations du projet
if [ -f ".vercel/project.json" ]; then
    PROJECT_ID=$(cat .vercel/project.json | grep -o '"projectId":"[^"]*"' | cut -d'"' -f4 || echo "")
    if [ -z "$PROJECT_ID" ]; then
        echo "❌ Impossible de lire l'ID du projet depuis .vercel/project.json"
        exit 1
    fi
else
    echo "❌ Fichier .vercel/project.json introuvable"
    echo "   Exécutez d'abord: $VERCEL_CMD link"
    exit 1
fi

echo ""
echo "🔧 Configuration des variables d'environnement..."
echo ""

# Configurer chaque variable pour Production, Preview et Development
for key in "${!ENV_VARS[@]}"; do
    value="${ENV_VARS[$key]}"
    echo "  ✓ Configuration de $key..."
    
    # Production
    $VERCEL_CMD env add "$key" production <<< "$value" || true
    
    # Preview
    $VERCEL_CMD env add "$key" preview <<< "$value" || true
    
    # Development
    $VERCEL_CMD env add "$key" development <<< "$value" || true
done

echo ""
echo "✅ Variables d'environnement configurées avec succès!"
echo ""
echo "📝 Note: Vous devrez redéployer votre projet pour que les changements prennent effet."
echo "   Redéploiement via: $VERCEL_CMD --prod"
echo ""

