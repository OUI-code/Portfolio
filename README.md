# Portfolio — Romain Cornuel

Portfolio professionnel réalisé dans le cadre du **BTS SIO, option SLAM**.

Site statique développé avec **Next.js 16**, **React 19**, **TypeScript** et **Tailwind CSS**,
exporté en HTML/CSS/JS pur (`output: 'export'`) : il se déploie aussi bien sur Vercel que
sur GitHub Pages, Netlify ou n'importe quel hébergeur de fichiers.

## Contenu du site

| Page | Chemin | Contenu |
| --- | --- | --- |
| Accueil | `/` | Présentation, compétences, projets phares, contact |
| Expérience | `/experience/` | Stage OCI EXPRESS détaillé, CV et lettre de motivation |
| Projets & tutoriels | `/projets/` | Projets en entreprise et projets de formation, avec documentation PDF |
| Veille technologique | `/veille/` | Sujet, méthode, sources suivies et fiches de veille |

## Démarrer en local

```bash
npm install
npm run dev
```

Le site est alors accessible sur http://localhost:3000

## Générer la version de production

```bash
npm run build
```

Les fichiers statiques sont générés dans le dossier `out/`.

## Modifier le contenu

**Tout le contenu du site est centralisé dans [`lib/data.ts`](lib/data.ts).**
Aucune page ne contient de texte codé en dur : pour ajouter un projet, une expérience
ou une fiche de veille, il suffit de modifier ce fichier.

### Points à compléter

Trois valeurs sont marquées `TODO` dans `lib/data.ts` :

- `profil.email` — l'adresse de contact à afficher publiquement
- `profil.github` — l'URL du profil GitHub
- `profil.linkedin` — l'URL LinkedIn (laisser vide masque le lien)

La section `veille.fiches` contient une fiche vide à remplacer par les fiches réelles.
Tant qu'aucune fiche n'a de titre, la page affiche un encart « en cours de rédaction ».

### Ajouter un document PDF

1. Déposer le fichier dans `public/documents/`
2. Le référencer depuis `lib/data.ts` :
   ```ts
   document: { nom: "Nom affiché", fichier: "mon-fichier.pdf" }
   ```

## Structure du projet

```
portfolio/
├── app/                  # Pages (App Router de Next.js)
│   ├── layout.tsx        # Structure commune : navigation + pied de page
│   ├── globals.css       # Styles globaux et classes utilitaires
│   ├── page.tsx          # Accueil
│   ├── experience/
│   ├── projets/
│   └── veille/
├── components/           # Composants réutilisables
│   ├── Nav.tsx           # Barre de navigation (responsive)
│   ├── Footer.tsx
│   └── ProjetCard.tsx    # Carte d'un projet
├── lib/
│   └── data.ts           # ← TOUT LE CONTENU DU SITE
└── public/
    └── documents/        # CV, lettre de motivation, guides PDF
```

## Déploiement

### Option A — Vercel (recommandé)

1. Pousser le dépôt sur GitHub
2. Sur [vercel.com](https://vercel.com), importer le dépôt
3. Vercel détecte Next.js automatiquement : aucune configuration nécessaire

Chaque `git push` redéploie le site automatiquement.

### Option B — GitHub Pages

Le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) est déjà
configuré. Dans les réglages du dépôt GitHub, aller dans **Settings → Pages** et choisir
**GitHub Actions** comme source.

Si le site est publié dans un sous-dossier (`https://pseudo.github.io/portfolio/`),
définir la variable d'environnement `NEXT_PUBLIC_BASE_PATH=/portfolio` — c'est déjà
prévu dans le workflow.

## Accessibilité et performance

- Lien d'évitement vers le contenu principal
- Navigation au clavier avec styles de focus visibles
- Balises `<html lang="fr">` et métadonnées Open Graph
- Site entièrement statique : environ 1,3 Mo au total, aucun serveur requis
