import type { Metadata } from "next";
import { veille } from "@/lib/data";
import VeilleEmbed from "@/components/VeilleEmbed";
import { articlesAAnalyser } from "@/lib/rss";

const outil = veille.outil;

export const metadata: Metadata = {
  title: "Veille technologique",
  description: `Ma veille technologique sur le thème : ${veille.sujet}. Sources suivies, méthode et fiches de lecture.`,
};

export default function Veille() {
  const fiches = veille.fiches.filter((f) => f.titre.trim() !== "");
  // Articles remontés par l'outil et pour lesquels je n'ai pas encore écrit de fiche.
  const { articles, total } = articlesAAnalyser(12);

  return (
    <>
      <section className="wrap pb-12 pt-20 sm:pt-24">
        <p className="eyebrow">Veille technologique</p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl">{veille.sujet}</h1>
      </section>

      {/* Pourquoi ce sujet -------------------------------------------------- */}
      <section className="wrap py-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="text-2xl">Pourquoi ce sujet</h2>
          </div>
          <p className="leading-relaxed text-slate-400">{veille.pourquoi}</p>
        </div>
      </section>

      {/* Méthode ------------------------------------------------------------ */}
      <section className="wrap py-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="text-2xl">Ma méthode</h2>
            <p className="mt-3 text-sm text-slate-500">Comment j&apos;organise ma veille au quotidien.</p>
          </div>
          <ol className="space-y-4">
            {veille.methode.map((etape, i) => (
              <li key={etape} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-sm font-semibold text-accent-400">
                  {i + 1}
                </span>
                <span className="leading-relaxed text-slate-400">{etape}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Outil de veille automatisée ---------------------------------------- */}
      <section className="wrap py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Automatisation</p>
            <h2 className="mt-3 text-2xl">L&apos;outil qui alimente ma collecte</h2>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h3 className="text-xl">{outil.nom}</h3>

            {/* Crédit de l'auteur : cet outil n'est pas de moi. */}
            <p className="mt-2 text-sm text-slate-500">
              Outil développé par{" "}
              <a
                href={outil.auteurUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-accent-400 hover:underline"
              >
                {outil.auteur}
              </a>
              , que j&apos;utilise pour automatiser la collecte. Je n&apos;en suis pas l&apos;auteur.
            </p>

            <p className="mt-5 leading-relaxed text-slate-400">{outil.description}</p>

            <ul className="mt-6 space-y-3">
              {outil.fonctions.map((f) => (
                <li key={f} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                  <span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {outil.techno.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>

            <p className="mt-6 rounded-xl border-l-2 border-accent-500/50 bg-white/[0.03] p-4 text-sm leading-relaxed text-slate-400">
              L&apos;outil me sert à <strong className="text-slate-200">collecter et trier</strong>{" "}
              l&apos;information. Les fiches publiées plus bas restent rédigées par mes soins :
              c&apos;est mon analyse, pas celle de la machine.
            </p>
          </div>

          <VeilleEmbed />
        </div>
      </section>

      {/* Sources ------------------------------------------------------------ */}
      <section className="wrap py-12">
        <h2 className="text-2xl">Les sources que je suis</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {veille.sources.map((s) => (
            <a key={s.nom} href={s.url} target="_blank" rel="noreferrer" className="card group">
              <div className="flex items-center justify-between">
                <h3 className="text-lg group-hover:text-accent-400">{s.nom}</h3>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-slate-600 group-hover:text-accent-400"
                >
                  <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{s.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Fiches de lecture --------------------------------------------------- */}
      <section className="wrap py-12">
        <h2 className="text-2xl">Mes fiches de veille</h2>

        {fiches.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
            <p className="text-slate-400">Mes fiches de veille sont en cours de rédaction.</p>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600">
              Chaque fiche présente un article lu, sa source, un résumé et ce que j&apos;en retiens
              pour mes propres projets.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {fiches.map((f) => (
              <article key={f.titre} className="card">
                <div className="flex flex-wrap items-center gap-3">
                  {f.date && <span className="tag-accent">{f.date}</span>}
                  {f.source && <span className="text-xs text-slate-500">{f.source}</span>}
                </div>

                <h3 className="mt-4 text-xl">{f.titre}</h3>

                {f.resume && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Résumé</p>
                    <p className="mt-2 leading-relaxed text-slate-400">{f.resume}</p>
                  </div>
                )}

                {f.retenu && (
                  <div className="mt-5 rounded-xl border-l-2 border-accent-500 bg-accent-500/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent-400">
                      Ce que j&apos;en retiens
                    </p>
                    <p className="mt-2 leading-relaxed text-slate-300">{f.retenu}</p>
                  </div>
                )}

                {f.lien && (
                  <a
                    href={f.lien}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-block text-sm font-semibold text-accent-400 hover:text-accent-500"
                  >
                    Lire l&apos;article →
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      {/* File d'attente : articles collectés, pas encore analysés ------------- */}
      {articles.length > 0 && (
        <section className="wrap py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">File d&apos;attente</p>
              <h2 className="mt-3 text-2xl">À analyser</h2>
            </div>
            <p className="text-sm text-slate-500">
              {articles.length} affichés sur {total}
            </p>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">
            Ces articles ont été remontés par {outil.nom} et je n&apos;ai pas encore rédigé de
            fiche à leur sujet. Chacun disparaît de cette liste dès que sa fiche est publiée
            plus haut. La date indiquée est celle de la collecte, pas celle de publication de
            l&apos;article.
          </p>

          <ul className="mt-8 divide-y divide-white/5 border-y border-white/5">
            {articles.map((a) => (
              <li key={a.lien}>
                <a
                  href={a.lien}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col gap-2 py-5 transition sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <span
                    title={`Collecté le ${a.dateAffichee}`}
                    className="shrink-0 text-xs tabular-nums text-slate-600 sm:w-32"
                  >
                    {a.dateAffichee}
                  </span>

                  <span className="flex-1">
                    <span className="block font-medium leading-snug text-slate-200 group-hover:text-accent-400">
                      {a.titre}
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
      )}
    </>
  );
}
