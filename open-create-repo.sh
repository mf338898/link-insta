#!/bin/bash

# Script pour ouvrir la page de création du repo GitHub avec les bons paramètres

echo "🌐 Ouverture de la page de création du repository GitHub..."
echo ""
echo "📝 Instructions rapides :"
echo "   1. Repository name : link-insta"
echo "   2. Ne cochez AUCUNE option (pas de README, .gitignore, ou license)"
echo "   3. Cliquez sur 'Create repository'"
echo "   4. Revenez ici et exécutez : git push -u origin main"
echo ""

# Ouvrir la page de création avec le nom pré-rempli
open "https://github.com/new?name=link-insta" 2>/dev/null || \
  xdg-open "https://github.com/new?name=link-insta" 2>/dev/null || \
  echo "Ouvrez manuellement : https://github.com/new?name=link-insta"

