// -----------------------------------------------------------------------------
// Toutes les données du portfolio sont centralisées ici.
// Pour mettre à jour le site, il suffit de modifier ce fichier : aucune page
// n'a de texte codé en dur.
// -----------------------------------------------------------------------------

export const profil = {
  prenom: "Romain",
  nom: "Cornuel",
  titre: "Étudiant en BTS SIO — option SLAM",
  sousTitre: "Solutions Logicielles et Applications Métiers · La Réunion",
  accroche:
    "Je conçois et développe des applications web métiers, du recueil du besoin client jusqu'à la mise en production. Actuellement en formation BTS SIO, j'ai mené des projets en environnement professionnel chez OCI EXPRESS en tant que chef de projet et développeur.",
  // TODO — remplace par l'adresse que tu veux rendre publique sur ton portfolio
  email: "cornuel.romain.bts@outlook.fr",
  // TODO — renseigne ton profil GitHub une fois le dépôt créé
  github: "https://github.com/OUI-code",
  linkedin: "",
  localisation: "La Réunion (974)",
};

export const formation = {
  intitule: "BTS SIO — option SLAM",
  intituleLong:
    "Brevet de technicien supérieur Services informatiques aux organisations, option B : Solutions Logicielles et Applications Métiers",
  etablissement: "Lycée Pierre Poivre",
  // Fiche officielle du diplôme, pour les lecteurs qui ne connaissent pas le BTS SIO.
  lienOnisep:
    "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/bts-services-informatiques-aux-organisations-option-b-solutions-logicielles-et-applications-metiers",
};

export const chiffres = [
  { valeur: "4", label: "projets menés en entreprise" },
  { valeur: "6", label: "semaines de stage" },
  { valeur: "9", label: "langages pratiqués" },
];

export const competences = [
  {
    categorie: "Langages",
    items: ["Java", "Python", "PHP", "JavaScript", "TypeScript", "SQL", "C++", "HTML", "CSS"],
  },
  {
    categorie: "Frameworks & bibliothèques",
    items: ["Next.js", "React", "JavaFX", "tRPC", "Prisma", "Drizzle ORM", "Tailwind CSS"],
  },
  {
    categorie: "Bases de données",
    items: ["MySQL", "PostgreSQL", "Neon", "Modélisation MCD / MLD"],
  },
  {
    categorie: "Outils & environnements",
    items: ["Git", "Docker", "Linux / VPS", "Apache", "Machines virtuelles", "Google Apps Script", "Vercel"],
  },
  {
    categorie: "Cybersécurité",
    items: ["Chiffrement AES-256", "Web Crypto API", "Authentification 2FA / TOTP", "Hachage bcrypt", "Gestion des droits"],
  },
];

// -----------------------------------------------------------------------------
// Expérience professionnelle
// -----------------------------------------------------------------------------

export const experiences = [
  {
    poste: "Chef de projet & développeur — Stage BTS SIO 1er année",
    entreprise: "OCI EXPRESS",
    lieu: "La Réunion",
    periode: "Stage de 6 semaines",
    contexte:
      "OCI EXPRESS accompagne ses clients dans l'obtention de la carte OCI (Overseas Citizen of India) : reconstitution généalogique jusqu'à l'ancêtre indien, collecte, apostille et traduction des actes d'état civil, puis dépôt du dossier au consulat de l'Inde.",
    missions: [
      "Participation aux entretiens clients : recueil et reformulation des besoins métier.",
      "Rôle de chef de projet sur l'application principale : découpage des tâches, suivi de l'avancement et coordination de l'équipe de développement.",
      "Développement full-stack sur quatre applications, du modèle de données jusqu'à l'interface.",
      "Mise en production sur VPS avec conteneurisation Docker.",
      "Rédaction de la documentation technique et des guides utilisateurs.",
    ],
    apports: [
      "Traduire un besoin métier exprimé en langage courant en spécifications techniques exploitables.",
      "Tenir un rôle de chef de projet : arbitrer, prioriser et rendre compte de l'avancement.",
      "Prendre en compte la sécurité et la confidentialité dès la conception, car les applications manipulent des actes d'état civil et des documents d'identité.",
    ],
  },
];

// -----------------------------------------------------------------------------
// Projets
// -----------------------------------------------------------------------------

export type Projet = {
  slug: string;
  titre: string;
  soustitre: string;
  contexte: "Professionnel" | "Scolaire" | "Personnel";
  role: string;
  description: string;
  points: string[];
  techno: string[];
  document?: { nom: string; fichier: string };
  lien?: string;
};

export const projetsPro: Projet[] = [
  {
    slug: "logiciel-metier-oci",
    titre: "Logiciel Métier OCI EXPRESS",
    soustitre: "ERP / CRM métier pour la gestion des dossiers carte OCI",
    contexte: "Professionnel",
    role: "Chef de projet et développeur, en équipe",
    description:
      "Application métier complète qui pilote le cycle de vie d'un dossier client : reconstitution de l'arbre généalogique, suivi des actes d'état civil, apostille, traduction et dépôt consulaire. Elle remplace un suivi jusque-là réparti entre tableurs et messagerie.",
    points: [
      "Modélisation du domaine métier (clients, dossiers, actes, généalogie) avec Prisma.",
      "API typée de bout en bout avec tRPC : le contrat entre le front et le back est vérifié dès la compilation.",
      "Authentification et gestion fine des rôles avec NextAuth, double authentification TOTP.",
      "Génération automatique de documents PDF et export Excel des dossiers.",
      "Import de fichiers GEDCOM pour la reconstitution généalogique.",
      "Déploiement conteneurisé avec Docker sur un VPS.",
    ],
    techno: ["Next.js", "TypeScript", "tRPC", "Prisma", "PostgreSQL", "NextAuth", "Docker", "Tailwind CSS"],
  },
  {
    slug: "coffre-fort",
    titre: "Coffre-fort numérique",
    soustitre: "Gestionnaire de mots de passe à architecture zero-knowledge",
    contexte: "Professionnel",
    role: "Conception et développement en autonomie",
    description:
      "Gestionnaire de mots de passe dans lequel le serveur ne peut jamais lire les données qu'il stocke. Le chiffrement et le déchiffrement se font intégralement dans le navigateur : la clé est dérivée du mot de passe maître et ne quitte jamais le poste de l'utilisateur.",
    points: [
      "Chiffrement AES-256 côté client via la Web Crypto API du navigateur.",
      "Dérivation de la clé à partir du mot de passe maître : le serveur ne stocke que du chiffré.",
      "Le mot de passe maître n'est jamais transmis au serveur, même lors de l'authentification.",
      "Double authentification par TOTP, avec lecture du QR code depuis le navigateur.",
      "Procédure de sauvegarde et de restauration documentée.",
    ],
    techno: ["Next.js", "TypeScript", "Web Crypto API", "AES-256", "Prisma", "bcrypt", "TOTP"],
  },
  {
    slug: "planora",
    titre: "Planora",
    soustitre: "Gestion de projet et planification Gantt",
    contexte: "Professionnel",
    role: "Conception et développement",
    description:
      "Outil de gestion de projet permettant de découper un projet en tâches, de les positionner dans le temps et de visualiser l'ensemble sous forme de diagramme de Gantt, afin de suivre les jalons et les dépendances.",
    points: [
      "Diagramme de Gantt interactif rendu côté client.",
      "Base de données PostgreSQL serverless (Neon) interrogée avec Drizzle ORM.",
      "Déploiement continu sur Vercel à chaque push.",
    ],
    techno: ["Next.js", "TypeScript", "Drizzle ORM", "PostgreSQL / Neon", "Vercel"],
  },
  {
    slug: "pointapp",
    titre: "PointApp",
    soustitre: "Pointage et planning des stagiaires",
    contexte: "Professionnel",
    role: "Conception et développement en autonomie",
    description:
      "Application interne de pointage et de gestion du planning des stagiaires, construite directement sur l'écosystème Google déjà utilisé par l'entreprise, afin d'éviter d'introduire un nouvel outil à administrer.",
    points: [
      "Backend en Google Apps Script, avec Google Sheets comme base de données.",
      "Interface web servie directement par Apps Script.",
      "Suivi des heures et génération des documents liés aux conventions de stage.",
    ],
    techno: ["Google Apps Script", "JavaScript", "Google Sheets", "HTML", "CSS"],
  },
];

export const projetsScolaires: Projet[] = [
  {
    slug: "cinefilm-php",
    titre: "Cinéfilm — site web PHP / MySQL",
    soustitre: "Application web hébergée sur un serveur Apache en machine virtuelle",
    contexte: "Scolaire",
    role: "Développement et administration du serveur",
    description:
      "Site web permettant de consulter un catalogue de films, d'en ajouter et de les noter. L'ensemble est déployé sur un serveur Apache installé dans une machine virtuelle, ce qui m'a fait travailler autant la partie développement que la mise en service.",
    points: [
      "Installation et configuration du serveur Apache et de MySQL dans une machine virtuelle.",
      "Développement des pages PHP et des requêtes vers la base de données.",
      "Compréhension des échanges entre le navigateur, le serveur et la base de données.",
    ],
    techno: ["PHP", "MySQL", "Apache", "Machine virtuelle", "HTML", "CSS"],
    document: { nom: "Guide — Serveur PHP / MySQL", fichier: "Guide_Serveur_PHP_MySQL_Cinefilm.pdf" },
  },
  {
    slug: "javafx-mvc",
    titre: "Application JavaFX connectée à MySQL",
    soustitre: "Consultation et insertion de données en architecture MVC",
    contexte: "Scolaire",
    role: "Développement",
    description:
      "Application de bureau en JavaFX reliée à une base MySQL, permettant d'afficher et d'ajouter des films, des critiques et des notes depuis une interface graphique. Le projet est organisé selon le modèle MVC afin de séparer les responsabilités.",
    points: [
      "Architecture MVC : séparation du modèle, de la vue et du contrôleur.",
      "Connexion JDBC à une base MySQL.",
      "Formulaires d'insertion avec contrôle des données saisies.",
    ],
    techno: ["Java", "JavaFX", "MySQL", "JDBC", "MVC"],
    document: { nom: "Documentation — Insertion SQL", fichier: "Documentation_InsertionSQL.pdf" },
  },
  {
    slug: "javafx-sql",
    titre: "Exécuteur de requêtes SQL en JavaFX",
    soustitre: "Affichage dynamique du résultat d'une requête",
    contexte: "Scolaire",
    role: "Développement",
    description:
      "Application permettant de saisir une requête SQL et d'en afficher le résultat dans un tableau. Le tableau se construit automatiquement à partir des colonnes renvoyées, quelle que soit la requête exécutée.",
    points: [
      "Construction dynamique des colonnes à partir des métadonnées du ResultSet.",
      "Gestion des erreurs SQL et retour lisible à l'utilisateur.",
      "Approfondissement du langage SQL et de l'API JDBC.",
    ],
    techno: ["Java", "JavaFX", "SQL", "JDBC"],
    document: { nom: "Guide — Requêtes SQL en JavaFX", fichier: "Guide_Requete_SQL_JavaFX.pdf" },
  },
];

export const documents = [
  {
    nom: "Curriculum vitae",
    fichier: "CV_Romain_Cornuel_fulmar.pdf",
    description: "Mon parcours, ma formation et mes compétences au format PDF.",
  },
  {
    nom: "Lettre de motivation",
    fichier: "lettre-de-motivation.pdf",
    description: "Ma lettre de motivation au format PDF.",
  },
];

// -----------------------------------------------------------------------------
// Veille technologique
// -----------------------------------------------------------------------------

export const veille = {
  sujet: "La cryptographie quantique",
  pourquoi:
    "Les algorithmes qui protègent aujourd'hui les échanges sur le web — RSA et les courbes elliptiques — reposent sur des problèmes mathématiques qu'un ordinateur quantique suffisamment puissant saurait résoudre. Le sujet rejoint directement mes projets : j'ai développé un coffre-fort numérique dont toute la sécurité repose sur du chiffrement, et je voulais comprendre lesquels de ces choix techniques tiendront dans dix ans, et lesquels ne tiendront pas.",

  // Distinction de vocabulaire souvent confondue, et régulièrement demandée à l'oral.
  distinction: {
    titre: "Deux sujets que l'on confond souvent",
    items: [
      {
        terme: "Cryptographie quantique",
        texte:
          "Elle utilise les propriétés de la physique quantique pour sécuriser un échange. Son application principale est la distribution quantique de clés (QKD) : toute tentative d'interception modifie l'état des particules transmises, et devient donc détectable. Elle demande du matériel spécifique et reste peu déployée.",
      },
      {
        terme: "Cryptographie post-quantique",
        texte:
          "Ce sont des algorithmes classiques, exécutés sur des ordinateurs ordinaires, mais conçus pour résister à une attaque menée avec un ordinateur quantique. C'est la voie retenue pour la transition, et celle que recommandent le NIST comme l'ANSSI.",
      },
    ],
  },

  // Repères techniques du sujet. Ce sont les bases que je dois maîtriser ;
  // les fiches de veille plus bas, elles, portent sur l'actualité.
  reperes: [
    {
      titre: "L'algorithme de Shor",
      texte:
        "Il casse RSA et les courbes elliptiques en résolvant efficacement la factorisation et le logarithme discret. C'est lui qui rend la transition nécessaire.",
    },
    {
      titre: "L'algorithme de Grover",
      texte:
        "Il divise par deux la sécurité effective des algorithmes symétriques. AES-256 conserve donc l'équivalent de 128 bits, ce qui reste considéré comme sûr : le chiffrement symétrique est bien moins menacé que l'asymétrique.",
    },
    {
      titre: "La standardisation du NIST",
      texte:
        "En août 2024, le NIST a publié ses premiers standards post-quantiques : ML-KEM pour l'échange de clés, ML-DSA et SLH-DSA pour la signature.",
    },
    {
      titre: "« Harvest now, decrypt later »",
      texte:
        "Des données chiffrées interceptées aujourd'hui peuvent être conservées pour être déchiffrées plus tard. C'est pourquoi la transition concerne dès maintenant les données à longue durée de vie, comme les actes d'état civil.",
    },
  ],

  methode: [
    "Collecte automatisée avec l'application Veille IA présentée plus bas : elle agrège les articles publiés sur mon thème de veille depuis le web et des flux RSS spécialisés.",
    "Tri manuel des résultats : je ne conserve que les articles qui concernent réellement mon sujet et dont la source me paraît fiable.",
    "Rédaction d'une fiche personnelle pour chaque article retenu, avec mes propres mots : le résumé, puis ce que j'en retire concrètement pour mes projets.",
    "Lecture directe des publications du NIST et de l'ANSSI pour tout ce qui touche aux standards et aux recommandations officielles, que je préfère consulter à la source.",
  ],

  // Outil utilisé pour automatiser la collecte. Ce n'est pas mon projet :
  // il est développé par Ikar, l'auteur est crédité sur la page.
  outil: {
    nom: "Veille IA",
    url: "https://veille-tech.onrender.com",
    depot: "https://github.com/Ikar-code/veille_tech",
    auteur: "Ikar",
    auteurUrl: "https://github.com/Ikar-code",
    description:
      "Plateforme de veille technologique automatisée : elle collecte des articles depuis le web et des flux RSS, filtre les contenus pertinents, en génère des synthèses à l'aide de modèles de langage, puis publie le résultat sous forme de flux RSS et de page HTML.",
    fonctions: [
      "Collecte multi-sources : recherche web et flux RSS spécialisés.",
      "Filtrage des articles selon la pertinence du sujet, la qualité de la source et la fraîcheur de l'information.",
      "Génération de synthèses par une chaîne d'agents : recherche, vérification, rédaction puis contrôle qualité.",
      "Historique des sessions, qui permet de suivre l'évolution d'un sujet dans le temps.",
      "Publication automatique du résultat en flux RSS et en page HTML.",
    ],
    techno: ["Python", "Streamlit", "Groq API", "Supabase", "GitHub Actions"],
    // Le service est hébergé sur une offre gratuite qui se met en veille :
    // le premier chargement mesuré a pris 34 secondes, les suivants 0,4 s.
    delaiReveil:
      "L'application est hébergée sur une offre gratuite qui met le service en veille après quelques minutes d'inactivité. Le premier chargement peut donc demander une trentaine de secondes.",
  },
  sources: [
    {
      nom: "ANSSI",
      url: "https://cyber.gouv.fr/actualites",
      desc: "Agence nationale de la sécurité des systèmes d'information : sa position sur la transition post-quantique fait référence en France.",
    },
    {
      nom: "NIST — Post-Quantum Cryptography",
      url: "https://csrc.nist.gov/projects/post-quantum-cryptography",
      desc: "Le programme de standardisation des algorithmes post-quantiques. La source de référence sur le sujet.",
    },
    {
      nom: "Inria",
      url: "https://www.inria.fr/fr",
      desc: "Recherche française en informatique, dont les travaux sur la cryptographie et le calcul quantique.",
    },
    {
      nom: "Cloudflare Research",
      url: "https://blog.cloudflare.com/tag/post-quantum/",
      desc: "Le déploiement réel du post-quantique sur le web, avec les mesures et les difficultés rencontrées.",
    },
    {
      nom: "LeMagIT",
      url: "https://www.lemagit.fr/",
      desc: "Actualité technique et sécurité des systèmes d'information, en français.",
    },
    {
      nom: "Le Monde Informatique",
      url: "https://www.lemondeinformatique.fr/",
      desc: "Actualité générale de l'informatique professionnelle.",
    },
  ],
  // ---------------------------------------------------------------------------
  // À COMPLÉTER — remplace ces entrées par tes propres fiches de veille.
  // Format d'une fiche : date, titre, source, lien, résumé, ce que tu en retiens.
  // Tant qu'une fiche a un titre vide, la page affiche un encart « en cours ».
  // ---------------------------------------------------------------------------
  fiches: [
    {
      date: "",
      titre: "",
      source: "",
      lien: "",
      resume: "",
      retenu: "",
    },
  ],
};

export const navigation = [
  { href: "/", label: "Accueil" },
  { href: "/experience/", label: "Expérience" },
  { href: "/projets/", label: "Projets & tutoriels" },
  { href: "/veille/", label: "Veille technologique" },
];
