# Python Quest

Python Quest est un jeu de plateau solo pour enfants de 10 à 12 ans qui apprennent Python. L'univers suit "L'ile des Pythonautes" : chaque case du plateau ouvre un exercice Python à résoudre en écrivant une seule fonction. L'étape est réussie uniquement si les 5 tests passent.

Le projet est organisé en deux applications :

- `frontend/` : interface React + Vite + TypeScript + Tailwind CSS + Monaco Editor
- `backend/` : API FastAPI qui exécute le code dans un processus Python séparé avec timeout

## Hébergement GitHub Pages

GitHub Pages peut héberger le frontend, mais pas le backend FastAPI. Pour une mise en ligne complète :

- héberge `frontend/` sur GitHub Pages
- héberge `backend/` sur un autre service Python, par exemple Render, Railway, Fly.io ou un VPS
- configure l'URL publique du backend dans la variable `VITE_API_BASE_URL`

Le frontend est maintenant prévu pour cela :

- chemin de base configurable avec `VITE_BASE_PATH`
- URL d'API configurable avec `VITE_API_BASE_URL`
- workflow GitHub Actions prêt dans `.github/workflows/deploy-pages.yml`

## Fonctionnalités

- Plateau de 20 étapes réparties sur 10 niveaux
- Progression locale avec `localStorage`
- Etapes verrouillées tant que la précédente n'est pas réussie
- Interface de type atelier de code : consigne, éditeur, résultats de tests
- 20 exercices progressifs couvrant les bases de Python
- Exécution isolée dans un sous-processus avec répertoire temporaire et timeout strict

## Arborescence

```text
python-quest/
  frontend/
    src/
      components/
      data/
      pages/
      styles/
      App.tsx
      main.tsx
  backend/
    app/
      main.py
      models.py
      runner.py
      exercises.py
    requirements.txt
  README.md
```

## Lancer le backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API attendue sur `http://localhost:8000`.

## Lancement simple sur Windows PowerShell

Pour un poste élève Windows, le plus simple est d'utiliser le script racine :

```powershell
powershell -ExecutionPolicy Bypass -File .\run-local.ps1
```

Ou encore plus simple, avec un double-clic sur :

```text
lancer-python-quest.bat
```

Ce script :

- vérifie `Python` et `npm`
- crée `backend/.venv` si nécessaire
- installe les dépendances backend et frontend
- crée `frontend/.env` à partir de `.env.example` si besoin
- ouvre deux fenêtres PowerShell : backend et frontend

Pré-requis machine :

- Python 3.11 ou plus récent
- Node.js LTS avec `npm`

## Lancer le frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Application attendue sur `http://localhost:5173`.

Le fichier `.env` local peut contenir :

```bash
VITE_API_BASE_URL=http://localhost:8000
VITE_BASE_PATH=/
```

## Déployer le frontend sur GitHub Pages

1. Pousser le dépôt sur GitHub.
2. Héberger le backend ailleurs et récupérer son URL publique, par exemple `https://python-quest-api.onrender.com`.
3. Dans le dépôt GitHub, ouvrir `Settings > Secrets and variables > Actions`.
4. Ajouter un secret nommé `VITE_API_BASE_URL` avec la valeur de l'API publique.
5. Dans `Settings > Pages`, choisir `GitHub Actions` comme source.
6. Pousser sur `main` pour déclencher le workflow.

Le workflow :

- installe le frontend
- construit avec `VITE_BASE_PATH=/<nom-du-repo>/`
- publie `frontend/dist` sur GitHub Pages

L'URL finale du site sera généralement :

```text
https://<ton-utilisateur>.github.io/<nom-du-repo>/
```

## Build local compatible GitHub Pages

```bash
cd frontend
npm install
VITE_API_BASE_URL=https://ton-backend.example.com VITE_BASE_PATH=/python-quest/ npm run build
```

## Vérification manuelle

1. Lancer le backend puis le frontend.
2. Ouvrir l'application dans le navigateur.
3. Vérifier que le plateau montre 20 étapes.
4. Ouvrir l'étape 1.
5. Cliquer sur `Lancer les tests` avec le code de départ : l'étape doit échouer.
6. Remplacer le code par une bonne solution et relancer.
7. Vérifier que les 5 tests passent et que le bouton `Continuer l'aventure` apparaît.
8. Revenir au plateau et vérifier que l'étape suivante est déverrouillée.
9. Recharger la page : la progression doit rester visible.
10. Cliquer sur `Réinitialiser la progression` et vérifier que seul le premier exercice reste accessible.

## Validation locale utile

Backend :

```bash
cd backend
python -m compileall app
```

Frontend :

```bash
cd frontend
npm run build
```

Pour vérifier le build GitHub Pages en local :

```bash
cd frontend
VITE_API_BASE_URL=http://localhost:8000 VITE_BASE_PATH=/python-quest/ npm run build
```

## Site de téléchargement ZIP

Une page statique simple est disponible dans `download-site/` pour télécharger des archives du projet :

- `download-site/archives/python-quest-backend.zip`
- `download-site/archives/python-quest-frontend.zip`
- `download-site/archives/python-quest-complet.zip`

Pour régénérer les archives :

```bash
python tools/build_download_archives.py
```

Pour ouvrir le mini-site en local :

```bash
cd download-site
python -m http.server 8080
```

Puis ouvrir `http://localhost:8080`.

## Notes de sécurité

Version actuelle :

- le code élève est exécuté dans un processus Python séparé
- timeout strict de 2 secondes
- taille maximale du code limitée
- fichiers temporaires supprimés après exécution
- `stdout`, `stderr` et exceptions sont capturés
- les tests sont reconstruits côté serveur

Limites volontaires de cette première version :

- pas de conteneur Docker par exécution
- pas de compte utilisateur ni d'isolation système forte
- filtrage simple de quelques motifs dangereux, mais pas une sandbox parfaite

## Renforcer plus tard avec Docker

Pour une version plus sûre, l'architecture du backend permet de remplacer le runner actuel par un exécuteur par conteneur :

1. Construire une image Python minimale avec dépendances figées.
2. Monter un dossier temporaire en lecture/écriture dans un conteneur jetable.
3. Désactiver le réseau.
4. Limiter CPU et mémoire.
5. Détruire le conteneur après chaque soumission.

Le point d'entrée à remplacer sera principalement `backend/app/runner.py`.
