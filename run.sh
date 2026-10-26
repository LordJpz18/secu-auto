#!/usr/bin/env bash

set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if ! command -v node >/dev/null 2>&1; then
  echo "Erreur : Node.js n'est pas installé. Installez Node.js 20 ou une version plus récente."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "Erreur : npm n'est pas disponible."
  exit 1
fi

NODE_MAJOR="$(node --version | sed 's/^v//' | cut -d. -f1)"
if [ "$NODE_MAJOR" -lt 20 ]; then
  echo "Erreur : Node.js 20 minimum est requis. Version détectée : $(node --version)"
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installation des dépendances…"
  npm install
fi

if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "Fichier .env.local créé depuis .env.example."
fi

echo "Démarrage d'Abrauto sur http://localhost:3000"
echo "Utilisez Ctrl+C pour arrêter le serveur."
exec npm run dev
