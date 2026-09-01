import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { profil } from "@/lib/data";

export const metadata: Metadata = {
  title: {
    default: `${profil.prenom} ${profil.nom} — Portfolio BTS SIO SLAM`,
    template: `%s — ${profil.prenom} ${profil.nom}`,
  },
  description: profil.accroche,
  keywords: ["BTS SIO", "SLAM", "développeur", "portfolio", "Next.js", "La Réunion"],
  authors: [{ name: `${profil.prenom} ${profil.nom}` }],
  openGraph: {
    title: `${profil.prenom} ${profil.nom} — Portfolio BTS SIO SLAM`,
    description: profil.accroche,
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
        >
          Aller au contenu principal
        </a>
        <Nav />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
