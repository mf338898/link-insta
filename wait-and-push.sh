#!/bin/bash

# Script qui attend que le repo GitHub soit créé puis pousse le code automatiquement

REPO_URL="https://api.github.com/repos/mf338898/link-insta"
MAX_ATTEMPTS=30
ATTEMPT=0

echo "⏳ Attente de la création du repository GitHub..."
echo "   URL: https://github.com/mf338898/link-insta"
echo ""
echo "📝 Si vous ne l'avez pas encore fait :"
echo "   1. Allez sur : https://github.com/new?name=link-insta"
echo "   2. Créez le repository (sans README, .gitignore, ou license)"
echo "   3. Ce script détectera automatiquement la création"
echo ""

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$REPO_URL")
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo "✅ Repository détecté ! Le repo existe maintenant."
        echo ""
        echo "📤 Push du code vers GitHub..."
        echo ""
        
        # Essayer le push
        if git push -u origin main 2>&1; then
            echo ""
            echo "✅ ✅ ✅ SUCCÈS ! Code poussé vers GitHub !"
            echo ""
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            echo "🔗 PROCHAINES ÉTAPES : Connecter à Vercel"
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            echo ""
            echo "1. Allez sur : https://vercel.com/new"
            echo "2. Cliquez sur 'Continue with GitHub'"
            echo "3. Sélectionnez le repository : mf338898/link-insta"
            echo "4. Vercel détectera automatiquement :"
            echo "   - Framework: Next.js"
            echo "   - Root Directory: app"
            echo "5. Cliquez sur 'Deploy'"
            echo ""
            exit 0
        else
            echo ""
            echo "❌ Erreur lors du push. Vous devrez peut-être :"
            echo "   - Configurer vos identifiants GitHub"
            echo "   - Créer un Personal Access Token"
            echo ""
            echo "Essayez manuellement :"
            echo "   git push -u origin main"
            echo ""
            exit 1
        fi
    fi
    
    ATTEMPT=$((ATTEMPT + 1))
    if [ $ATTEMPT -lt $MAX_ATTEMPTS ]; then
        echo -n "."
        sleep 2
    fi
done

echo ""
echo "⏱️  Timeout atteint. Le repository n'a pas été créé dans les temps."
echo ""
echo "Vérifiez que le repo existe : https://github.com/mf338898/link-insta"
echo "Si oui, exécutez manuellement : git push -u origin main"
echo ""

