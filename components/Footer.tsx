import Link from "next/link";
import { navigation, profil } from "@/lib/data";

export default function Footer() {
  const annee = 2026;

  return (
    <footer className="mt-24 border-t border-white/10 bg-ink-950/60">
      <div className="wrap grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-sm font-semibold text-white">
            {profil.prenom} {profil.nom}
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500">
            {profil.titre} — {profil.localisation}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Navigation
          </p>
          <ul className="mt-3 space-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-slate-400 transition hover:text-accent-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contact</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href={`mailto:${profil.email}`}
                className="text-sm text-slate-400 transition hover:text-accent-400"
              >
                {profil.email}
              </a>
            </li>
            {profil.github && (
              <li>
                <a
                  href={profil.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-slate-400 transition hover:text-accent-400"
                >
                  GitHub
                </a>
              </li>
            )}
            {profil.linkedin && (
              <li>
                <a
                  href={profil.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-slate-400 transition hover:text-accent-400"
                >
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="wrap py-6">
          <p className="text-xs text-slate-600">
            © {annee} {profil.prenom} {profil.nom} — Portfolio développé avec Next.js, React et Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
