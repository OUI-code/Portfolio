// -----------------------------------------------------------------------------
// Lecture des flux RSS publiés par l'application Veille IA.
//
// L'application (github.com/Ikar-code/veille_tech) pousse dans ce dépôt des
// fichiers rss/AAAA-MM-JJ_HH-MM_<sujet>.xml. Ce module les lit AU MOMENT DU
// BUILD : chaque push de l'application déclenche un redéploiement, et la liste
// des articles est régénérée.
//
// Un article est considéré comme « traité » dès qu'une fiche de veille porte
// son lien. Il n'y a donc rien à pointer à la main : écrire la fiche suffit à
// le faire disparaître de la liste « à analyser ».
// -----------------------------------------------------------------------------

import fs from "node:fs";
import path from "node:path";
import { veille } from "./data";

export type ArticleCollecte = {
  titre: string;
  lien: string;
  description: string;
  dateISO: string;
  dateAffichee: string;
  source: string;
  sujet: string;
  /** Vrai si une fiche de veille porte déjà ce lien. */
  traite: boolean;
};

const DOSSIER_RSS = path.join(process.cwd(), "rss");

/** Décode les entités XML. `&amp;` est traité en dernier pour éviter un double décodage. */
function decoder(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#3[49];/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();
}

function baliseDe(xml: string, nom: string): string {
  const m = xml.match(new RegExp(`<${nom}(?:\\s[^>]*)?>([\\s\\S]*?)</${nom}>`));
  return m ? decoder(m[1]) : "";
}

/** Normalise une URL pour comparer deux liens : casse, slash final et pistage. */
function normaliserLien(url: string): string {
  try {
    const u = new URL(url.trim());
    u.hash = "";
    for (const p of [...u.searchParams.keys()]) {
      if (/^(utm_|fbclid|gclid|mc_|ref$)/i.test(p)) u.searchParams.delete(p);
    }
    const chemin = u.pathname.replace(/\/+$/, "");
    return `${u.hostname.toLowerCase().replace(/^www\./, "")}${chemin}${u.search}`;
  } catch {
    return url.trim().toLowerCase().replace(/\/+$/, "");
  }
}

function domaineDe(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/**
 * Attention : dans generer_rss(), l'application donne le MÊME pubDate à tous
 * les items d'un flux — celui de la génération. Cette date est donc une date
 * de collecte, pas la date de publication de l'article. La page le précise.
 */
function formaterDate(rfc822: string): { iso: string; affichee: string; ts: number } {
  const d = new Date(rfc822);
  if (Number.isNaN(d.getTime())) return { iso: "", affichee: "", ts: 0 };
  return {
    iso: d.toISOString(),
    affichee: new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(d),
    ts: d.getTime(),
  };
}

/**
 * Lit tous les flux du dossier rss/ et renvoie l'intégralité des articles
 * collectés, chacun marqué comme traité ou non.
 *
 * Un article est traité dès qu'une fiche de veille porte son lien.
 */
export function lireCollecte(): {
  articles: ArticleCollecte[];
  total: number;
  aAnalyser: number;
  fluxLus: number;
} {
  let fichiers: string[] = [];
  try {
    fichiers = fs
      .readdirSync(DOSSIER_RSS)
      .filter((f) => f.toLowerCase().endsWith(".xml"));
  } catch {
    // Le dossier rss/ n'existe pas encore : l'application n'a rien publié.
    return { articles: [], total: 0, aAnalyser: 0, fluxLus: 0 };
  }

  // Liens déjà couverts par une fiche rédigée.
  const dejaTraites = new Set(
    veille.fiches
      .map((f) => f.lien)
      .filter((l) => l && l.trim() !== "")
      .map(normaliserLien)
  );

  const parLien = new Map<string, ArticleCollecte & { ts: number }>();

  for (const fichier of fichiers) {
    let xml: string;
    try {
      xml = fs.readFileSync(path.join(DOSSIER_RSS, fichier), "utf8");
    } catch {
      continue;
    }

    // Le titre du flux vaut « Veille IA - <Sujet> » : on ne garde que le sujet.
    const titreFlux = baliseDe(xml.split("<item>")[0] ?? "", "title");
    const sujet = titreFlux.replace(/^Veille IA\s*-\s*/i, "").trim();

    for (const bloc of xml.split("<item>").slice(1)) {
      const item = bloc.split("</item>")[0] ?? "";
      const lien = baliseDe(item, "link");
      const titre = baliseDe(item, "title");
      if (!lien || !titre) continue;

      const cle = normaliserLien(lien);
      const { iso, affichee, ts } = formaterDate(baliseDe(item, "pubDate"));

      // Un même article peut revenir dans plusieurs flux : on garde le plus récent.
      const existant = parLien.get(cle);
      if (existant && existant.ts >= ts) continue;

      parLien.set(cle, {
        titre,
        lien,
        description: baliseDe(item, "description"),
        dateISO: iso,
        dateAffichee: affichee,
        source: domaineDe(lien),
        sujet,
        traite: dejaTraites.has(cle),
        ts,
      });
    }
  }

  const tries = [...parLien.values()].sort((a, b) => b.ts - a.ts);
  const articles = tries.map(({ ts, ...a }) => a);

  return {
    articles,
    total: articles.length,
    aAnalyser: articles.filter((a) => !a.traite).length,
    fluxLus: fichiers.length,
  };
}
