"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, profil } from "@/lib/data";

export default function Nav() {
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);

  const estActif = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/80 backdrop-blur-lg">
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500 text-sm font-bold text-ink-950">
            RC
          </span>
          <span className="hidden text-sm font-semibold text-white sm:block">
            {profil.prenom} {profil.nom}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                estActif(item.href)
                  ? "rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white"
                  : "rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOuvert((v) => !v)}
          aria-expanded={ouvert}
          aria-label="Ouvrir le menu de navigation"
          className="rounded-lg border border-white/15 p-2 text-slate-300 md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {ouvert ? (
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {ouvert && (
        <nav className="border-t border-white/10 bg-ink-950 md:hidden">
          <div className="wrap flex flex-col py-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOuvert(false)}
                className={
                  estActif(item.href)
                    ? "rounded-lg px-3 py-3 text-sm font-medium text-accent-400"
                    : "rounded-lg px-3 py-3 text-sm font-medium text-slate-400"
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
