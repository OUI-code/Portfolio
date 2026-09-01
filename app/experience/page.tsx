import type { Metadata } from "next";
import { documents, experiences, profil } from "@/lib/data";

export const metadata: Metadata = {
  title: "Expérience",
  description:
    "Mon parcours professionnel, mon stage de BTS SIO chez OCI EXPRESS, mon CV et ma lettre de motivation.",
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Experience() {
  return (
    <>
      <section className="wrap pb-12 pt-20 sm:pt-24">
        <p className="eyebrow">Parcours</p>
        <h1 className="mt-4 text-4xl sm:text-5xl">Expérience professionnelle</h1>
        <p className="mt-6 max-w-2xl leading-relaxed text-slate-400">
          Le détail de mon expérience en entreprise, les missions qui m&apos;ont été confiées et ce
          que j&apos;en ai retiré. Mon CV et ma lettre de motivation sont téléchargeables en bas de
          page.
        </p>
      </section>

      {/* Expériences ------------------------------------------------------- */}
      <section className="wrap py-8">
        <div className="space-y-8">
          {experiences.map((exp) => (
            <article key={exp.entreprise} className="rounded-2xl border border-white/10 bg-ink-900/60 p-7 sm:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl">{exp.poste}</h2>
                  <p className="mt-2 text-lg font-medium text-accent-400">{exp.entreprise}</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="tag">{exp.periode}</span>
                  <p className="mt-2 text-sm text-slate-500">{exp.lieu}</p>
                </div>
              </div>

              <div className="mt-8 border-l-2 border-accent-500/30 pl-5">
                <h3 className="text-sm uppercase tracking-wider text-slate-500">
                  Contexte de l&apos;entreprise
                </h3>
                <p className="mt-3 leading-relaxed text-slate-400">{exp.contexte}</p>
              </div>

              <div className="mt-8">
                <h3 className="text-sm uppercase tracking-wider text-slate-500">Missions réalisées</h3>
                <ul className="mt-4 space-y-3">
                  {exp.missions.map((m) => (
                    <li key={m} className="flex gap-3 leading-relaxed text-slate-400">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="text-sm uppercase tracking-wider text-slate-500">
                  Ce que ce stage m&apos;a apporté
                </h3>
                <ul className="mt-4 space-y-3">
                  {exp.apports.map((a) => (
                    <li key={a} className="flex gap-3 leading-relaxed text-slate-400">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Documents --------------------------------------------------------- */}
      <section className="wrap py-16">
        <p className="eyebrow">Documents</p>
        <h2 className="mt-3 text-3xl">CV et lettre de motivation</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-slate-400">
          Ces documents sont consultables directement dans le navigateur ou téléchargeables au
          format PDF.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {documents.map((doc) => (
            <a
              key={doc.fichier}
              href={`${basePath}/documents/${doc.fichier}`}
              target="_blank"
              rel="noreferrer"
              className="card group flex items-start gap-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-500/15 text-accent-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinejoin="round" />
                  <path d="M14 2v6h6" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                <span className="block font-semibold text-white group-hover:text-accent-400">
                  {doc.nom}
                </span>
                <span className="mt-1 block text-sm text-slate-500">{doc.description}</span>
                <span className="mt-3 block text-xs font-semibold uppercase tracking-wider text-accent-400">
                  Ouvrir le PDF →
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Contact ----------------------------------------------------------- */}
      <section className="wrap pb-8">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <p className="text-slate-400">
            Une question sur mon parcours ? Écrivez-moi à{" "}
            <a href={`mailto:${profil.email}`} className="font-semibold text-accent-400 hover:underline">
              {profil.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
