import type { Metadata } from "next";
import { projetsPro, projetsScolaires } from "@/lib/data";
import ProjetCard from "@/components/ProjetCard";

export const metadata: Metadata = {
  title: "Projets & tutoriels",
  description:
    "Les projets que j'ai réalisés en entreprise et en formation, avec pour chacun le contexte, mon rôle, les choix techniques et la documentation associée.",
};

export default function Projets() {
  return (
    <>
      <section className="wrap pb-12 pt-20 sm:pt-24">
        <p className="eyebrow">Réalisations</p>
        <h1 className="mt-4 text-4xl sm:text-5xl">Projets &amp; tutoriels</h1>
        <p className="mt-6 max-w-2xl leading-relaxed text-slate-400">
          Vous trouverez ici les projets réalisés en entreprise pendant mon stage, ainsi que ceux
          menés dans le cadre de ma formation. Pour chacun, je précise le contexte, mon rôle et les
          choix techniques. Les projets scolaires sont accompagnés de la documentation que j&apos;ai
          rédigée, où je détaille la démarche suivie et les difficultés rencontrées.
        </p>
      </section>

      {/* Projets professionnels -------------------------------------------- */}
      <section className="wrap py-10">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl">Projets en entreprise</h2>
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-sm text-slate-500">{projetsPro.length} projets</span>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {projetsPro.map((p) => (
            <ProjetCard key={p.slug} projet={p} />
          ))}
        </div>
      </section>

      {/* Projets scolaires -------------------------------------------------- */}
      <section className="wrap py-10">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl">Projets de formation &amp; tutoriels</h2>
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-sm text-slate-500">{projetsScolaires.length} projets</span>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">
          Chaque projet est accompagné d&apos;un document PDF dans lequel j&apos;ai consigné mes
          notes : la démarche, les erreurs rencontrées et la façon dont je les ai résolues.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {projetsScolaires.map((p) => (
            <ProjetCard key={p.slug} projet={p} />
          ))}
        </div>
      </section>
    </>
  );
}
