import type { Projet } from "@/lib/data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function ProjetCard({ projet }: { projet: Projet }) {
  return (
    <article className="card flex flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <span className="tag-accent">{projet.contexte}</span>
        <span className="text-xs text-slate-500">{projet.role}</span>
      </div>

      <h3 className="mt-4 text-xl">{projet.titre}</h3>
      <p className="mt-1 text-sm font-medium text-accent-400">{projet.soustitre}</p>

      <p className="mt-4 text-sm leading-relaxed text-slate-400">{projet.description}</p>

      <ul className="mt-5 space-y-2">
        {projet.points.map((point) => (
          <li key={point} className="flex gap-3 text-sm leading-relaxed text-slate-400">
            <span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {projet.techno.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>

      {projet.document && (
        <a
          href={`${basePath}/documents/${projet.document.fichier}`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-400 transition hover:text-accent-500"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {projet.document.nom} (PDF)
        </a>
      )}
    </article>
  );
}
