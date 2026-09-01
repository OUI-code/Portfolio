# Dossier `rss/`

Ce dossier reçoit les flux RSS publiés automatiquement par l'application
**Veille IA** ([Ikar-code/veille_tech](https://github.com/Ikar-code/veille_tech)).

## Comment l'alimenter

Dans l'application hébergée sur Render, renseigner :

- un **jeton d'accès personnel GitHub** (Personal Access Token) ayant le droit
  d'écriture sur ce dépôt ;
- le **nom du dépôt** de ce portfolio, au format `pseudo/portfolio`.

Le cron de l'application y pousse alors des fichiers nommés
`AAAA-MM-JJ_HH-MM_<sujet>.xml`.

## Ce qui se passe ensuite

1. L'application pousse un nouveau flux dans ce dossier.
2. Le push déclenche automatiquement un redéploiement (Vercel ou GitHub Actions).
3. [`lib/rss.ts`](../lib/rss.ts) lit les flux au moment du build.
4. Les articles apparaissent dans la section **« À analyser »** de la page Veille.

Un article disparaît de cette section dès qu'une fiche portant son lien est
ajoutée dans `veille.fiches` ([`lib/data.ts`](../lib/data.ts)). La comparaison
ignore la casse, le `www.`, le slash final et les paramètres de pistage.

## Sécurité

Le jeton GitHub se configure **dans l'application Render**, jamais dans ce
dépôt. Ne jamais committer de jeton ici. Un jeton à portée limitée (accès en
écriture à ce seul dépôt) suffit.
