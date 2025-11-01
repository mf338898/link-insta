#!/bin/bash

# Script pour reconnecter le bon repository GitHub au projet Vercel

VERCEL_TOKEN="Q8vrzvvGlfGdXqJPHk0u7CFB"
PROJECT_NAME="link-insta"
CORRECT_REPO="mf338898/link-insta"

echo "🔧 Correction de la connexion du repository GitHub..."
echo ""

# Option 1: Supprimer le projet et le recréer (plus sûr)
read -p "Voulez-vous supprimer le projet actuel et le recréer avec le bon repo? (o/N) " -n 1 -r
echo

if [[ $REPLY =~ ^[Oo]$ ]]; then
    echo "🗑️  Suppression du projet actuel..."
    DELETE_RESPONSE=$(curl -s -w "\n%{http_code}" -X DELETE \
        -H "Authorization: Bearer $VERCEL_TOKEN" \
        "https://api.vercel.com/v9/projects/$PROJECT_NAME")
    
    HTTP_CODE=$(echo "$DELETE_RESPONSE" | tail -1)
    
    if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "204" ]; then
        echo "✅ Projet supprimé"
        sleep 2
        
        echo "📦 Recréation du projet avec le bon repository..."
        CREATE_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
            -H "Authorization: Bearer $VERCEL_TOKEN" \
            -H "Content-Type: application/json" \
            -d "{
                \"name\": \"$PROJECT_NAME\",
                \"gitRepository\": {
                    \"type\": \"github\",
                    \"repo\": \"$CORRECT_REPO\"
                },
                \"rootDirectory\": \"app\"
            }" \
            "https://api.vercel.com/v9/projects")
        
        CREATE_HTTP=$(echo "$CREATE_RESPONSE" | tail -1)
        CREATE_BODY=$(echo "$CREATE_RESPONSE" | head -n -1)
        
        if [ "$CREATE_HTTP" = "200" ] || [ "$CREATE_HTTP" = "201" ]; then
            echo "✅ Projet recréé avec le repository correct!"
            echo ""
            echo "🌐 Vérifiez sur : https://vercel.com/$PROJECT_NAME"
            echo ""
            echo "Le prochain push sur GitHub déclenchera un déploiement automatique."
        else
            echo "❌ Erreur lors de la recréation"
            echo "$CREATE_BODY"
        fi
    else
        echo "⚠️  Impossible de supprimer le projet (HTTP $HTTP_CODE)"
        echo "Essayons de corriger le repository connecté..."
    fi
fi

echo ""
echo "📝 Alternative : Corrigez manuellement sur Vercel :"
echo "   1. Allez sur : https://vercel.com/$PROJECT_NAME/settings/git"
echo "   2. Déconnectez le repository actuel"
echo "   3. Reconnectez : $CORRECT_REPO"
echo ""

