import Link from "next/link";
import { chiffres, competences, profil, projetsPro } from "@/lib/data";
import ProjetCard from "@/components/ProjetCard";
import HeroCanvas from "@/components/HeroCanvas";

export default function Accueil() {
  return (
    <>
      {/* Hero -------------------------------------------------------------- */}
      {/* Le canvas décoratif est en fond absolu ; le contenu passe au-dessus
          grâce au z-10, et reste lisible même si le canvas ne se dessine pas. */}
      <section className="relative overflow-hidden">
        <HeroCanvas />

        <div className="wrap relative z-10 pb-16 pt-20 sm:pt-28">
          <p className="eyebrow">Portfolio · BTS SIO option SLAM</p>

          <h1 className="mt-5 max-w-4xl text-4xl leading-[1.1] sm:text-6xl">
            {profil.prenom} {profil.nom}
            <span className="mt-3 block text-2xl font-medium text-slate-400 sm:text-3xl">
              {profil.titre}
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {profil.accroche}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/projets/" className="btn-primary">
              Voir mes projets
            </Link>
            <Link href="/experience/" className="btn-ghost">
              Mon parcours et mon CV
            </Link>
          </div>

          <dl className="mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
            {chiffres.map((c) => (
              <div key={c.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <dt className="text-3xl font-bold text-white">{c.valeur}</dt>
                <dd className="mt-1 text-sm text-slate-500">{c.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Présentation ------------------------------------------------------ */}
      <section className="wrap py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="eyebrow">À propos</p>
            <h2 className="mt-3 text-3xl">Qui je suis</h2>
          </div>

          <div className="prose-fr space-y-4">
            <p>
              Je suis étudiant en BTS SIO, option SLAM — Solutions Logicielles et Applications
              Métiers. Cette option est celle du développement : conception d&apos;applications,
              modélisation de bases de données, et déploiement des solutions.
            </p>
            <p>
              Ce portfolio rassemble les projets que j&apos;ai menés, aussi bien dans le cadre de ma
              formation qu&apos;en entreprise. Pour chacun, je détaille le contexte, mon rôle, les
              choix techniques que j&apos;ai faits et ce que le projet m&apos;a appris. Vous y
              trouverez également mon CV, ma lettre de motivation et ma veille technologique.
            </p>
            <p>
              Mon stage chez OCI EXPRESS a été déterminant : j&apos;y ai occupé un rôle de chef de
              projet en plus du développement, ce qui m&apos;a confronté au cycle complet, depuis
              l&apos;entretien client jusqu&apos;à la mise en production.
            </p>
          </div>
        </div>
      </section>

      {/* Compétences ------------------------------------------------------- */}
      <section className="wrap py-16">
        <p className="eyebrow">Compétences</p>
        <h2 className="mt-3 text-3xl">Technologies que je pratique</h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {competences.map((bloc) => (
            <div key={bloc.categorie} className="rounded-2xl border border-white/10 bg-ink-900/50 p-6">
              <h3 className="text-base text-accent-400">{bloc.categorie}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {bloc.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projets phares ---------------------------------------------------- */}
      <section className="wrap py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Réalisations</p>
            <h2 className="mt-3 text-3xl">Projets menés en entreprise</h2>
          </div>
          <Link href="/projets/" className="text-sm font-semibold text-accent-400 hover:text-accent-500">
            Tous les projets et tutoriels →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {projetsPro.slice(0, 2).map((p) => (
            <ProjetCard key={p.slug} projet={p} />
          ))}
        </div>
      </section>

      {/* Contact ----------------------------------------------------------- */}
      <section id="contact" className="wrap py-16">
        <div className="rounded-3xl border border-accent-500/20 bg-gradient-to-br from-accent-500/10 to-transparent p-10 text-center sm:p-14">
          <h2 className="text-3xl">Me contacter</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-400">
            Je suis à la recherche d&apos;une alternance ou d&apos;un stage en développement
            d&apos;applications. N&apos;hésitez pas à me contacter pour échanger sur un projet.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${profil.email}`} className="btn-primary">
              {profil.email}
            </a>
            <Link href="/experience/" className="btn-ghost">
              Télécharger mon CV
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
