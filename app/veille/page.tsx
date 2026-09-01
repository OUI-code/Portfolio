import type { Metadata } from "next";
import { veille } from "@/lib/data";

export const metadata: Metadata = {
  title: "Veille technologique",
  description: `Ma veille technologique sur le thème : ${veille.sujet}. Sources suivies, méthode et fiches de lecture.`,
};

export default function Veille() {
  const fiches = veille.fiches.filter((f) => f.titre.trim() !== "");

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
    </>
  );
}
