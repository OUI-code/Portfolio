"use client";

import { useEffect, useRef, useState } from "react";
import { veille } from "@/lib/data";

const outil = veille.outil;

/**
 * Intègre l'application de veille dans la page.
 *
 * L'application est hébergée sur une offre gratuite qui met le service en
 * veille : le premier chargement peut prendre une trentaine de secondes. On
 * affiche donc un écran de chargement explicite par-dessus l'iframe, avec un
 * compteur, plus un lien de secours pour l'ouvrir en plein écran.
 */
export default function VeilleEmbed() {
  const [charge, setCharge] = useState(false);
  const [secondes, setSecondes] = useState(0);
  const debut = useRef<number | null>(null);

  useEffect(() => {
    if (charge) return;
    debut.current = Date.now();
    const t = setInterval(() => {
      if (debut.current !== null) {
        setSecondes(Math.floor((Date.now() - debut.current) / 1000));
      }
    }, 1000);
    return () => clearInterval(t);
  }, [charge]);

  const longAttente = secondes >= 40;

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
        <iframe
          src={outil.url}
          title={`Application ${outil.nom}`}
          loading="lazy"
          onLoad={() => setCharge(true)}
          className="h-[70vh] min-h-[520px] w-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />

        {!charge && (
          <div
            role="status"
            aria-live="polite"
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink-950/95 px-6 text-center"
          >
            <span
              aria-hidden
              className="h-9 w-9 animate-spin rounded-full border-2 border-white/15 border-t-accent-400"
            />

            <p className="font-semibold text-white">
              Chargement de l&apos;application{secondes > 0 ? ` — ${secondes} s` : ""}
            </p>

            <p className="max-w-md text-sm leading-relaxed text-slate-500">
              {outil.delaiReveil}
            </p>

            {longAttente && (
              <p className="max-w-md text-sm leading-relaxed text-amber-300/90">
                Le réveil du serveur est plus long que d&apos;habitude. Vous pouvez ouvrir
                l&apos;application dans un onglet séparé avec le lien ci-dessous.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Lien de secours : toujours visible, même si l'iframe est bloquée
          par le navigateur ou par une extension. */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a href={outil.url} target="_blank" rel="noreferrer" className="btn-primary">
          Ouvrir en plein écran
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <a href={outil.depot} target="_blank" rel="noreferrer" className="btn-ghost">
          Voir le code source
        </a>
      </div>
    </div>
  );
}
