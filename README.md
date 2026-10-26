# Abrauto Automotive

Site vitrine statique pour la location de véhicules particuliers et utilitaires et l’accompagnement à l’achat. Aucun formulaire, réservation en ligne, stockage de données visiteurs ou envoi WhatsApp automatique n’est présent.

## Lancer le site

Prérequis : Node.js 20 ou plus récent.

```bash
npm install
./lancer-site.sh
```

Le site est disponible sur `http://localhost:3000`.

## Commandes

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
npm start
```

`npm run build` génère un export statique complet dans `out/`.

## Déploiement sur GitHub Pages

Le workflow `.github/workflows/deploy-pages.yml` construit et publie automatiquement le dossier `out/` à chaque push sur `main`. Le sous-chemin GitHub Pages est détecté automatiquement ; pour ce dépôt, l’adresse attendue est :

```text
https://lordjpz18.github.io/secu-auto/
```

Dans GitHub, ouvrir **Settings → Pages**, puis sélectionner **GitHub Actions** dans **Build and deployment → Source**. Un déploiement peut aussi être déclenché manuellement depuis l’onglet **Actions**.

Pour reproduire localement la configuration du dépôt GitHub Pages :

```bash
NEXT_PUBLIC_BASE_PATH=/secu-auto \
NEXT_PUBLIC_SITE_URL=https://lordjpz18.github.io/secu-auto \
npm run build
```

Les fichiers du dossier `public/` sont copiés dans l’export et `.nojekyll` empêche tout traitement Jekyll. GitHub Pages ne permet pas de définir les anciens en-têtes HTTP Next.js ; ceux-ci ont donc été retirés de la configuration statique.

## Contenus

- Catalogue local : `data/vehicles.ts`
- Coordonnées : `config/business.ts`
- Navigation : `config/navigation.ts`
- Métadonnées : `config/site.ts`
- Logo officiel web : `public/images/brand/logo-officiel.jpg`

## À fournir avant production

- adresse e-mail réelle ;
- adresse postale complète et code postal ;
- liens Instagram et Facebook ;
- logo SVG ou PNG transparent ;
- photos réelles de chaque véhicule ;
- marques, modèles, tarifs et caractéristiques validés ;
- conditions de location ;
- avis clients autorisés ;
- mentions légales définitives.

## Périmètre

Le catalogue est informatif : les disponibilités et conditions sont confirmées directement avec Abrauto par téléphone ou WhatsApp. Le site ne possède ni paiement, ni planning, ni espace client, ni back-office.
