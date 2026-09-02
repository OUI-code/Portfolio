import type { Metadata } from "next";
import Link from "next/link";
import { veille } from "@/lib/data";
import { lireCollecte } from "@/lib/rss";

const outil = veille.outil;

export const metadata: Metadata = {
  title: "Données collectées",
  description: `Les articles remontés automatiquement par ${outil.nom} sur le thème : ${veille.sujet}.`,
};

export default function Collecte() {
  const { articles, total, aAnalyser, fluxLus } = lireCollecte();

  return (
    <>
      <section className="wrap pb-10 pt-20 sm:pt-24">
        <Link
          href="/veille/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-accent-400"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18 9 12l6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Retour à la veille technologique
        </Link>

        <p className="eyebrow mt-8">Collecte automatisée</p>
        <h1 className="mt-4 text-4xl sm:text-5xl">Données collectées</h1>

        <p className="mt-6 max-w-2xl leading-relaxed text-slate-400">
          Cette page présente la matière brute de ma veille : les articles remontés
          automatiquement par {outil.nom} sur le thème « {veille.sujet} ». Ce sont les
          résultats de la collecte, pas mon analyse — celle-ci se trouve dans{" "}
          <Link href="/veille/" className="font-medium text-accent-400 hover:underline">
            mes fiches de veille
          </Link>
          .
        </p>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">
          Les dates affichées sont celles de la collecte, pas de la publication des articles.
        </p>
      </section>

      {articles.length === 0 ? (
        <section className="wrap py-10">
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-12 text-center">
            <p className="text-slate-400">Aucune collecte publiée pour le moment.</p>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600">
              Les articles apparaîtront ici dès que l&apos;application aura publié son premier
              flux.
            </p>
            <a
              href={outil.url}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost mt-8"
            >
              Ouvrir {outil.nom}
            </a>
          </div>
        </section>
      ) : (
        <>
          <section className="wrap py-4">
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { valeur: total, label: "articles collectés" },
                { valeur: aAnalyser, label: "restent à analyser" },
                { valeur: total - aAnalyser, label: "fiches rédigées" },
                { valeur: fluxLus, label: "collectes publiées" },
              ].map((c) => (
                <div key={c.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <dt className="text-2xl font-bold text-white">{c.valeur}</dt>
                  <dd className="mt-1 text-xs text-slate-500">{c.label}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="wrap py-10">
            <ul className="divide-y divide-white/5 border-y border-white/5">
              {articles.map((a) => (
                <li key={a.lien}>
                  <a
                    href={a.lien}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <span className="shrink-0 text-xs tabular-nums text-slate-600 sm:w-32">
                      {a.dateAffichee}
                    </span>

                    <span className="flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-medium leading-snug text-slate-200 group-hover:text-accent-400">
                          {a.titre}
                        </span>
                        {a.traite ? (
                          <span className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-emerald-300">
                            Fiche rédigée
                          </span>
                        ) : (
                          <span className="shrink-0 rounded-full border border-amber-400/25 bg-amber-400/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-amber-300/90">
                            À analyser
                          </span>
                        )}
                      </span>

                      {a.description && (
                        <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-slate-500">
                          {a.description}
                        </span>
                      )}
                    </span>

                    <span className="flex shrink-0 items-center gap-2 text-xs text-slate-600">
                      {a.source}
                      {a.sujet && <span className="tag">{a.sujet}</span>}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </>
  );
}
