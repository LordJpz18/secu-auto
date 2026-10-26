# ABRAUTO — Addendum de modification pour Codex

> Ce document modifie le cahier des charges Abrauto précédemment transmis. En cas de contradiction, les consignes ci-dessous ont priorité. L’objectif est désormais de transformer le projet en site vitrine automobile statique, sans réservation ni collecte de demandes depuis le site, et d’aligner entièrement son apparence sur la charte visuelle fournie dans logo1.JPG et logo2.JPG.

## 1. Résumé des deux changements obligatoires

### Changement 1 — Revenir à un site purement vitrine

Le site doit uniquement :

- présenter Abrauto et son positionnement ;
- afficher le catalogue des véhicules disponibles à la location ;
- différencier les véhicules particuliers et utilitaires ;
- présenter le service d’accompagnement à l’achat ;
- présenter les avantages et engagements de l’entreprise ;
- afficher les coordonnées complètes de l’entreprise ;
- permettre au visiteur d’appeler, d’envoyer un e-mail ou d’ouvrir l’adresse dans une application cartographique.

Le site ne doit plus :

- permettre de réserver un véhicule en ligne ;
- contenir de formulaire de location ;
- contenir de formulaire d’accompagnement à l’achat ;
- afficher de calendrier de réservation ;
- calculer une durée ou un prix total ;
- collecter les coordonnées d’un visiteur ;
- enregistrer des demandes dans Supabase ;
- envoyer de notification via WhatsApp Cloud API ;
- afficher une confirmation de réservation ;
- présenter une demande comme une réservation confirmée ;
- contenir une API métier pour les demandes commerciales.

### Changement 2 — Remplacer entièrement l’ancienne direction artistique

L’ancienne palette claire, ivoire et orange cuivré doit être supprimée. Le design doit maintenant reprendre l’identité visuelle fournie :

- fond noir ou presque noir ;
- texte blanc très contrasté ;
- vert néon/émeraude comme couleur d’accent ;
- typographie automobile, condensée, très grasse et italique pour les grands titres ;
- photos de véhicules sombres avec éclairage de contour ;
- lignes fines, cadres, cercles et détails lumineux verts ;
- composition graphique sportive, moderne et premium ;
- alternance de mots blancs et verts dans les slogans ;
- ponctuation forte avec des phrases très courtes et des points.

## 2. Références visuelles fournies

Les fichiers suivants servent de référence :

- IMG_8110.JPG : logo principal Abrauto Automotive ;
- IMG_8111.JPG : affiche de marque avec slogan, couleurs, iconographie et mise en page.

Ces fichiers doivent guider le design, mais ils ne doivent pas être intégrés comme de simples captures brutes dans l’interface.

### Traitement du logo

Le logo présente :

- une silhouette automobile verte ;
- le mot ABRAUTO en blanc, très gras et italique ;
- un A central stylisé avec un contre-espace triangulaire ;
- la signature AUTOMOTIVE en vert, très espacée ;
- un fond noir.

Consignes :

- utiliser le logo officiel fourni si sa qualité est suffisante ;
- préserver strictement ses proportions ;
- ne pas l’étirer, le déformer, le recolorer ou lui ajouter une ombre ;
- créer une version optimisée pour le web ;
- si possible, demander ultérieurement une version SVG ou PNG transparente pour la production ;
- si seul le JPEG est disponible, effectuer un recadrage propre et l’utiliser sur fond noir afin que le rectangle du fichier reste discret ;
- ne pas redessiner approximativement le logo dans le code si l’asset officiel peut être utilisé.

## 3. Nouveau périmètre fonctionnel

### Pages conservées

Le site peut conserver cette structure :

| Route | Contenu |
|---|---|
| / | Accueil, positionnement, aperçu du catalogue, avantages et contact |
| /vehicules | Catalogue complet des véhicules de location |
| /achat | Présentation du service d’accompagnement à l’achat |
| /avis | Avis clients réels, uniquement si cette page existe déjà et que les contenus sont validés |
| /contact | Coordonnées et moyens de contact, sans formulaire |
| /mentions-legales | Mentions légales |
| /confidentialite | Politique de confidentialité simplifiée |

La page /vehicules peut être fusionnée avec l’accueil si le catalogue est court. Ne pas multiplier les pages sans nécessité.

### Routes et fonctionnalités à supprimer

Supprimer complètement ou rendre inaccessibles :

- /api/rental-requests ;
- /api/purchase-requests ;
- les composants RentalForm, PurchaseForm et tous les formulaires multi-étapes ;
- le calendrier de réservation ;
- le sélecteur de période ;
- le calcul de prix total ;
- les écrans de récapitulatif et confirmation ;
- les schémas Zod spécifiques aux demandes ;
- React Hook Form si aucune autre fonctionnalité ne l’utilise ;
- React DayPicker et date-fns si aucune autre fonctionnalité ne les utilise ;
- le service NotificationProvider ;
- MetaWhatsAppProvider ;
- ConsoleNotificationProvider ;
- les variables META_WHATSAPP_* ;
- les tables rental_requests et purchase_requests de l’application ;
- les écritures Supabase depuis le site ;
- les messages invitant à « envoyer une demande » ou « confirmer une réservation ».

Nettoyer également :

- les imports devenus inutiles ;
- les dépendances devenues inutiles ;
- les variables d’environnement obsolètes ;
- les tests associés aux formulaires et aux API supprimées ;
- la documentation relative aux réservations, à Supabase et à WhatsApp.

Ne pas laisser du code mort commenté dans le dépôt.

## 4. Architecture simplifiée

Le projet doit rester en Next.js, TypeScript et Tailwind CSS, mais il doit devenir principalement statique.

### Données du catalogue

Stocker les véhicules dans un fichier local typé, par exemple :

    data/vehicles.ts

Chaque véhicule peut contenir :

    id
    slug
    name
    make
    model
    category
    dailyPrice
    status
    transmission
    fuel
    seats
    volumeM3
    payloadKg
    features
    coverImage
    gallery
    sortOrder

Les catégories restent :

- particulier ;
- utilitaire.

Les statuts autorisés peuvent être :

- Disponible ;
- Bientôt disponible ;
- Sur demande.

Le statut « Disponible » décrit le catalogue général. Il ne doit pas être interprété comme une disponibilité garantie pour une date précise.

### Données de l’entreprise

Centraliser les coordonnées dans :

    config/business.ts

Prévoir :

    businessName
    phone
    email
    address
    postalCode
    city
    country
    mapUrl
    openingHours
    instagramUrl
    facebookUrl
    whatsappUrl

Les informations manquantes doivent rester sous forme de placeholders clairement identifiés dans le code. Ne jamais inventer une adresse, un numéro ou des horaires.

### Base de données

Supabase n’est plus nécessaire pour cette V1 si :

- le catalogue est modifié directement dans le code ;
- les avis sont statiques ;
- aucun back-office n’est requis.

Retirer Supabase du projet si aucune fonctionnalité restante ne l’utilise.

Si Supabase est déjà fortement intégré et conservé uniquement pour lire le catalogue, aucun accès en écriture ne doit subsister. Toutefois, la préférence pour cette V1 est une source de données locale simple afin de réduire les coûts et la maintenance.

## 5. Nouvelle arborescence cible

    app/
    ├── achat/page.tsx
    ├── avis/page.tsx              # facultatif
    ├── contact/page.tsx
    ├── vehicules/page.tsx         # facultatif si catalogue sur l’accueil
    ├── mentions-legales/page.tsx
    ├── confidentialite/page.tsx
    ├── layout.tsx
    ├── page.tsx
    ├── sitemap.ts
    ├── robots.ts
    └── globals.css

    components/
    ├── layout/
    │   ├── Header.tsx
    │   ├── MobileMenu.tsx
    │   └── Footer.tsx
    ├── home/
    │   ├── Hero.tsx
    │   ├── BrandServices.tsx
    │   ├── FeaturedVehicles.tsx
    │   └── ContactStrip.tsx
    ├── vehicles/
    │   ├── VehicleCatalog.tsx
    │   ├── VehicleTabs.tsx
    │   └── VehicleCard.tsx
    ├── purchase/
    │   ├── PurchaseHero.tsx
    │   ├── PurchaseSteps.tsx
    │   └── PurchaseCategories.tsx
    ├── contact/
    │   └── ContactCard.tsx
    └── ui/

    config/
    ├── business.ts
    ├── navigation.ts
    └── site.ts

    data/
    ├── vehicles.ts
    ├── testimonials.ts            # facultatif
    └── content.ts

## 6. Nouvelle charte graphique

### Palette recommandée

Créer des tokens CSS centralisés. Les valeurs suivantes sont des approximations dérivées des références visuelles et pourront être ajustées à partir des assets officiels :

    --background: #030504;
    --background-elevated: #080B09;
    --surface: #0D110F;
    --surface-hover: #121814;
    --foreground: #F5F7F6;
    --muted: #A4ADA8;
    --border: #213129;
    --brand-green: #00E884;
    --brand-green-strong: #00C96B;
    --brand-green-soft: rgba(0, 232, 132, 0.14);
    --brand-glow: rgba(0, 232, 132, 0.34);
    --error: #FF5C5C;

Contraintes :

- le noir domine l’interface ;
- le blanc est utilisé pour les titres et le texte principal ;
- le vert sert aux mots clés, icônes, bordures, lignes, états focus et CTA ;
- ne pas utiliser le vert pour de longs paragraphes ;
- ne pas multiplier les autres couleurs ;
- ne pas réintroduire l’orange cuivré, le beige ou le bleu corporate ;
- vérifier les contrastes WCAG AA.

### Typographies

Titres :

- police sans-serif condensée, très grasse et oblique ;
- exemples possibles : Barlow Condensed ExtraBold Italic, Archivo Black Italic ou équivalent ;
- utiliser next/font lorsque la police est disponible ;
- titres en capitales, courts et très lisibles.

Texte courant :

- Inter, Manrope ou une sans-serif neutre ;
- graisse normale ou moyenne ;
- interlignage confortable.

Signature AUTOMOTIVE :

- capitales ;
- espacement des lettres très large ;
- taille réduite ;
- couleur verte.

### Style rédactionnel

Privilégier des formulations courtes et directes :

- LOUEZ. ROULEZ.
- TROUVEZ VOTRE VÉHICULE.
- PARTICULIERS. UTILITAIRES.
- UN ACCOMPAGNEMENT. À CHAQUE ÉTAPE.
- CONTACTEZ-NOUS.

Le slogan visible sur la référence « ACHETEZ. VENDEZ. LOUEZ. ROULEZ. » est une référence de style. Ne pas présenter la vente comme service actif tant qu’Abrauto ne l’a pas confirmée. Pour le périmètre actuel, utiliser plutôt :

    LOUEZ.
    ROULEZ.
    TROUVEZ.

ou :

    LOUEZ.
    ROULEZ.
    NOUS VOUS ACCOMPAGNONS.

Alterner un mot blanc puis un mot vert et conserver les points.

## 7. Nouveau header

Le header doit :

- être noir ou transparent sur le hero puis noir au scroll ;
- afficher le logo officiel à gauche ;
- afficher les liens Catalogue, Accompagnement à l’achat, Avis et Contact ;
- remplacer le bouton Réserver par Contacter Abrauto ou Appeler ;
- rester sticky ;
- comporter un menu mobile accessible ;
- utiliser une fine ligne verte ou un léger glow pour marquer l’état actif ;
- conserver une hauteur compacte et sportive.

Le CTA principal peut être un lien tel: vers le numéro configuré.

## 8. Nouvelle page d’accueil

### 8.1 Hero

Direction visuelle :

- fond noir ;
- photographie automobile sombre, premium, vue trois-quarts ou profil ;
- contours du véhicule révélés par une lumière verte ;
- grande zone négative noire ;
- titre court aligné à gauche ;
- mots alternés en blanc et vert ;
- ligne verte fine ou forme diagonale lumineuse ;
- logo visible mais sans répéter excessivement la marque.

Proposition de contenu :

    LOUEZ.
    ROULEZ.
    SIMPLEMENT.

Sous-titre :

    Véhicules particuliers et utilitaires.
    Un accompagnement personnalisé pour votre projet automobile.

CTA principal :

- Voir les véhicules.

CTA secondaire :

- Nous appeler.

Aucun CTA ne doit ouvrir un formulaire ou un tunnel de réservation.

### 8.2 Services

Reprendre le langage visuel de IMG_8111.JPG :

- icônes linéaires vertes dans des cercles ;
- titre blanc en capitales ;
- phrase courte en gris clair ;
- séparateurs horizontaux verts très fins.

Blocs recommandés :

1. LOCATION  
   Des véhicules adaptés à vos besoins.

2. ACCOMPAGNEMENT À L’ACHAT  
   Une recherche personnalisée selon vos critères.

3. SÉCURITÉ & TRANSPARENCE  
   Des informations claires pour avancer en confiance.

4. SUIVI PERSONNALISÉ  
   Un interlocuteur à chaque étape.

Ne pas affirmer un niveau de vérification, de garantie ou d’assurance non confirmé par l’entreprise.

### 8.3 Catalogue mis en avant

Conserver deux catégories :

- véhicules particuliers ;
- véhicules utilitaires.

La section peut utiliser des onglets ou deux sous-sections distinctes.

Chaque carte affiche :

- photo ;
- marque et modèle ;
- prix à partir de X € / jour ;
- statut général ;
- transmission ;
- carburant ;
- nombre de places ou volume utile ;
- caractéristiques principales ;
- lien Voir le véhicule ou Nous contacter.

Supprimer :

- Réserver ce véhicule ;
- Choisir mes dates ;
- Vérifier la disponibilité ;
- estimation totale ;
- tout bouton laissant croire à une réservation automatique.

Le lien de contact peut descendre vers la fiche contact ou déclencher un appel. Il ne transmet aucune donnée automatiquement.

### 8.4 Accompagnement à l’achat

Présenter le service comme un parcours informatif :

1. échange sur le besoin ;
2. définition du budget et des critères ;
3. recherche et présélection ;
4. accompagnement dans le choix final.

La formulation doit rester conforme au service réellement fourni. Ne pas promettre une inspection mécanique, une négociation, une garantie ou une vérification administrative si cela n’a pas été validé.

### 8.5 Avis clients

Si des avis réels existent :

- afficher une sélection statique ;
- conserver le style noir, blanc et vert ;
- ne pas permettre de déposer un avis sur le site ;
- ne pas utiliser de moyenne ou de note inventée ;
- masquer entièrement cette section si aucun contenu réel n’est disponible.

### 8.6 Fiche contact

La fiche contact remplace tous les formulaires.

Elle doit afficher :

- nom de l’entreprise ;
- numéro de téléphone cliquable ;
- adresse e-mail cliquable ;
- adresse postale complète ;
- horaires, si fournis ;
- lien Ouvrir dans Maps ;
- liens vers les réseaux sociaux, si fournis ;
- bouton Appeler ;
- bouton Envoyer un e-mail.

Structure des liens :

    href="tel:+33..."
    href="mailto:contact@..."
    href="{mapUrl}"

Ne pas afficher de champ de saisie.

La fiche peut être présentée dans une grande section noire surélevée avec :

- contour vert fin ;
- icônes vertes ;
- halo très discret ;
- motif de lignes diagonales dans un coin ;
- photographie automobile en arrière-plan très assombrie.

## 9. Page Catalogue

La page /vehicules, si elle est conservée, doit :

- présenter tous les véhicules ;
- proposer uniquement un filtrage d’affichage local ;
- ne pas interroger un planning ;
- ne pas demander de dates ;
- ne pas afficher de disponibilité en temps réel ;
- afficher un message clair :

> Les disponibilités et conditions de location sont confirmées directement avec Abrauto.

Les filtres autorisés peuvent être :

- Particuliers ;
- Utilitaires ;
- Automatique ;
- Manuelle ;
- Essence ;
- Diesel ;
- Hybride ;
- Électrique.

Les filtres fonctionnent côté client sur les données déjà chargées.

## 10. Page Accompagnement à l’achat

La page /achat conserve :

- un hero automobile sombre ;
- les catégories de véhicules : SUV, berline, citadine, break, utilitaire, hybride/électrique ;
- les étapes du service ;
- les avantages de l’accompagnement ;
- une fiche ou bande de contact finale.

Remplacer Décrire mon projet par :

- Parler à un conseiller ;
- Appeler Abrauto ;
- Envoyer un e-mail.

Ne pas ouvrir de formulaire.

## 11. Animations

Conserver des animations sobres, inspirées du visuel automobile :

- apparition des titres par masque ou clip vertical ;
- mots verts révélés légèrement après les mots blancs ;
- fine ligne verte qui se dessine ;
- halo vert très discret au survol ;
- zoom d’image limité à 1.02 ;
- déplacement de 4 à 8 px maximum ;
- cartes qui apparaissent en fondu lors du scroll ;
- transitions d’onglets fluides ;
- menu et header animés avec sobriété.

Éviter :

- pulsations permanentes ;
- néons agressifs ;
- glow excessif autour de tout le contenu ;
- animations WebGL ;
- curseur personnalisé ;
- parallax important ;
- animations qui rendent le site moins lisible.

Respecter prefers-reduced-motion.

## 12. Iconographie et formes

Reprendre les caractéristiques suivantes de la charte :

- icônes en trait fin ;
- icônes vertes ;
- cercle extérieur vert ;
- lignes séparatrices fines ;
- diagonales lumineuses dans certains coins ;
- cadres à faible opacité ;
- motifs automobiles simples.

Utiliser Lucide React de manière cohérente. Ne pas mélanger plusieurs styles d’icônes.

## 13. Photographie

Les images doivent :

- avoir un fond sombre ou être assombries avec un overlay ;
- privilégier les carrosseries noires, grises ou blanches ;
- montrer des silhouettes automobiles nettes ;
- utiliser un éclairage latéral ou de contour ;
- laisser de l’espace pour les titres ;
- conserver un traitement cohérent sur toutes les pages.

Pour les vraies fiches véhicules :

- utiliser les vraies photos des véhicules ;
- créer un cadre cohérent même si les photos ont des arrière-plans différents ;
- ne pas modifier la couleur du véhicule ;
- ne pas utiliser une photo générique à la place d’un véhicule annoncé comme disponible.

## 14. Responsive et accessibilité

- concevoir mobile-first ;
- conserver la hiérarchie des titres sur petit écran ;
- éviter que les mots en capitales dépassent ;
- ne pas dépendre uniquement de l’italique pour la hiérarchie ;
- garantir des contrastes suffisants ;
- prévoir des focus visibles verts et blancs ;
- offrir des zones tactiles d’au moins 44 × 44 px ;
- rendre les onglets et filtres utilisables au clavier ;
- donner des textes alt adaptés aux photos ;
- ne pas lancer automatiquement un carrousel ;
- respecter la réduction des animations.

## 15. SEO et contenu

Mettre à jour les métadonnées pour refléter le nouveau périmètre :

- location de véhicules ;
- véhicules particuliers ;
- véhicules utilitaires ;
- accompagnement à l’achat ;
- ville et zone desservie lorsque celles-ci seront confirmées.

Supprimer des métadonnées et données structurées toute mention de :

- réservation en ligne ;
- réservation instantanée ;
- disponibilité en temps réel ;
- formulaire de devis ;
- paiement en ligne.

Les données structurées LocalBusiness/AutoRental doivent utiliser uniquement des coordonnées réelles.

## 16. Confidentialité

Puisqu’aucune donnée n’est collectée par formulaire :

- simplifier la politique de confidentialité ;
- retirer les passages relatifs aux demandes de location et d’achat stockées en base ;
- retirer les passages relatifs au transfert des formulaires vers WhatsApp ;
- conserver les informations relatives à l’hébergement, aux logs techniques, aux cookies et aux analytics réellement utilisés ;
- ne pas installer de bannière de cookies si aucun traceur non essentiel n’est chargé ;
- vérifier la configuration réelle avant d’affirmer que le site n’utilise aucun cookie.

## 17. Dépendances et coûts

Après cette modification, le site peut fonctionner sans :

- Supabase ;
- WhatsApp Cloud API ;
- React Hook Form ;
- Zod pour les formulaires ;
- React DayPicker ;
- service de notifications ;
- fonction serveur métier.

Le site peut être généré statiquement et hébergé à coût très faible. Ne conserver que les dépendances réellement utilisées.

## 18. Tests à mettre à jour

Supprimer les tests concernant :

- soumission de réservation ;
- soumission d’accompagnement ;
- validation de formulaires ;
- calcul de dates et de prix ;
- idempotence ;
- notification WhatsApp ;
- insertion Supabase.

Ajouter ou conserver :

- rendu du catalogue ;
- filtrage particuliers/utilitaires ;
- affichage correct des informations véhicule ;
- liens tel et mailto ;
- lien Maps ;
- navigation clavier ;
- menu mobile ;
- accessibilité des onglets ;
- préférence de réduction des animations ;
- absence de formulaire sur toutes les pages ;
- absence d’endpoint de réservation ;
- build statique ou build Next.js réussi.

## 19. Critères d’acceptation

La modification est terminée lorsque :

- aucun formulaire de contact, de location ou d’achat n’est visible ;
- aucun endpoint de réservation ou de demande commerciale ne subsiste ;
- aucune donnée visiteur n’est collectée ;
- aucune notification WhatsApp automatique n’est envoyée ;
- le catalogue présente les véhicules sans réservation en ligne ;
- l’accompagnement à l’achat est présenté de manière informative ;
- les coordonnées sont visibles et cliquables ;
- la palette ivoire/orange a totalement disparu ;
- le noir, le blanc et le vert sont utilisés de façon cohérente ;
- le logo officiel est intégré proprement ;
- les titres utilisent une esthétique condensée, grasse et italique ;
- les icônes, séparateurs et cadres reprennent le style vert linéaire ;
- les images automobiles ont un traitement sombre et homogène ;
- le site reste lisible et accessible ;
- le responsive fonctionne de 360 à 1440 px ;
- les dépendances inutiles ont été supprimées ;
- lint, typecheck, tests et build réussissent.

## 20. Consigne finale pour Codex

Inspecte d’abord le dépôt existant et identifie les composants, routes, dépendances et variables d’environnement liés aux anciennes fonctionnalités.

Applique ensuite les modifications dans cet ordre :

1. retirer les formulaires et les routes API ;
2. retirer les services Supabase et WhatsApp devenus inutiles ;
3. nettoyer les dépendances, variables d’environnement, types et tests ;
4. convertir les données véhicules et avis en données locales typées ;
5. créer la fiche contact statique ;
6. remplacer tous les CTA de réservation par des CTA de contact direct ;
7. appliquer la nouvelle palette noire, blanche et verte ;
8. intégrer le logo fourni ;
9. reconstruire le hero, les sections services et les cartes selon la nouvelle charte ;
10. ajuster les pages catalogue et achat ;
11. vérifier le responsive, l’accessibilité et les animations réduites ;
12. mettre à jour les métadonnées, pages légales et documentation ;
13. exécuter lint, typecheck, tests et build.

Ne considère pas la tâche comme terminée si du code mort lié aux réservations reste dans le projet ou si des éléments de l’ancienne palette sont encore visibles.

À la fin, fournis :

- la liste des fichiers supprimés ;
- la liste des fichiers principaux modifiés ;
- les dépendances retirées ;
- le nouveau parcours utilisateur ;
- les coordonnées métier encore à renseigner ;
- les résultats des commandes de validation ;
- les éventuelles limites restantes.

## 21. Informations à fournir avant mise en production

Codex doit laisser des placeholders clairement identifiés pour les éléments non encore fournis :

- numéro de téléphone ;
- adresse e-mail ;
- adresse complète ;
- ville et zone desservie ;
- horaires ;
- lien Google Maps ou Apple Plans ;
- liens Instagram/Facebook ;
- logo SVG ou PNG transparent ;
- photos réelles de chaque véhicule ;
- modèles, tarifs et caractéristiques ;
- conditions de location ;
- avis clients autorisés ;
- mentions légales définitives.

