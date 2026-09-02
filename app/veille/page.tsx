import type { Metadata } from "next";
import Link from "next/link";
import { veille } from "@/lib/data";
import { lireCollecte } from "@/lib/rss";

const outil = veille.outil;

export const metadata: Metadata = {
  title: "Veille technologique",
  description: `Ma veille technologique sur le thème : ${veille.sujet}. Sources suivies, méthode et fiches de lecture.`,
};

export default function Veille() {
  const fiches = veille.fiches.filter((f) => f.titre.trim() !== "");
  // Compteurs de la collecte ; le détail est sur /veille/collecte/.
  const { total, aAnalyser } = lireCollecte();

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

      {/* Distinction de vocabulaire ----------------------------------------- */}
      <section className="wrap py-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="text-2xl">{veille.distinction.titre}</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {veille.distinction.items.map((d) => (
              <div key={d.terme} className="rounded-2xl border border-white/10 bg-ink-900/50 p-6">
                <h3 className="text-base text-accent-400">{d.terme}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{d.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Repères techniques -------------------------------------------------- */}
      <section className="wrap py-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="text-2xl">Les repères du sujet</h2>
            <p className="mt-3 text-sm text-slate-500">
              Les notions de fond que je dois maîtriser ; les fiches plus bas portent sur
              l&apos;actualité.
            </p>
          </div>

          <dl className="space-y-5">
            {veille.reperes.map((r) => (
              <div key={r.titre} className="border-l-2 border-accent-500/40 pl-5">
                <dt className="font-semibold text-slate-200">{r.titre}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-slate-400">{r.texte}</dd>
              </div>
            ))}
          </dl>
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

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_1fr]">
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

          {/* Accès aux données plutôt qu'intégration de l'application :
              la collecte est rendue nativement sur sa propre page. */}
          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-ink-900/60 p-7">
            <h3 className="text-lg">Consulter la collecte</h3>

            <p className="text-sm leading-relaxed text-slate-400">
              Les articles remontés par l&apos;outil sont publiés sur ce site, avec la mention
              de ceux qui attendent encore une fiche.
            </p>

            <dl className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <dt className="text-2xl font-bold text-white">{total}</dt>
                <dd className="mt-1 text-xs text-slate-500">articles collectés</dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <dt className="text-2xl font-bold text-white">{aAnalyser}</dt>
                <dd className="mt-1 text-xs text-slate-500">restent à analyser</dd>
              </div>
            </dl>

            <Link href="/veille/collecte/" className="btn-primary mt-1">
              Voir les données collectées
            </Link>

            <div className="mt-1 flex flex-wrap gap-3">
              <a href={outil.url} target="_blank" rel="noreferrer" className="btn-ghost flex-1">
                Ouvrir l&apos;application
              </a>
              <a href={outil.depot} target="_blank" rel="noreferrer" className="btn-ghost flex-1">
                Code source
              </a>
            </div>

            <p className="text-xs leading-relaxed text-slate-600">{outil.delaiReveil}</p>
          </div>
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
