"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; z: number };

// Les points vivent dans un cube unité [-1, 1] puis sont projetés en
// perspective. Travailler en coordonnées normalisées évite que le diviseur de
// la projection passe par zéro sur les très grands écrans.
const FOCALE = 520;
const PROFONDEUR = 170;
const DISTANCE_LIAISON = 116; // en pixels, après projection

// La rotation se fait dans le plan (x, z) : rz balaie ±√2, pas ±1. Le décalage
// de 1.6 garde le diviseur de la projection positif (1.6 - √2 ≈ 0.19).
const RZ_MAX = Math.SQRT2;
const ECHELLE_MIN = FOCALE / (FOCALE + (1.6 + RZ_MAX) * PROFONDEUR);
const ECHELLE_MAX = FOCALE / (FOCALE + (1.6 - RZ_MAX) * PROFONDEUR);

/**
 * Champ de points relié, projeté en perspective, dessiné en Canvas 2D.
 *
 * Purement décoratif, sans aucune dépendance. Le rendu s'arrête dès que la
 * section sort de l'écran ou que l'onglet passe en arrière-plan, et il est
 * remplacé par une image fixe si l'utilisateur a demandé moins d'animations.
 */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Mode économie de données : on ne dessine rien du tout.
    const connexion = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (connexion?.saveData) return;

    const mqAnimation = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqPointeur = window.matchMedia("(pointer: fine)");

    let largeur = 0;
    let hauteur = 0;
    let points: Point[] = [];
    let raf = 0;
    let angle = 0;
    let precedent = 0;
    let visible = true;
    let ongletActif = true;

    const cible = { x: 0, y: 0 };
    const camera = { x: 0, y: 0 };

    const redimensionner = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      // Le ratio de pixels est plafonné : au-delà, le coût de remplissage
      // grimpe sans gain visible sur un fond aussi discret.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      largeur = rect.width;
      hauteur = rect.height;
      canvas.width = Math.round(largeur * dpr);
      canvas.height = Math.round(hauteur * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const densite = Math.round((largeur * hauteur) / 15000);
      const nombre = Math.max(26, Math.min(78, densite));

      points = Array.from({ length: nombre }, () => ({
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        z: Math.random() * 2 - 1,
      }));
    };

    const dessiner = () => {
      ctx.clearRect(0, 0, largeur, hauteur);
      if (points.length === 0) return;

      const cx = largeur / 2 + camera.x * 26;
      const cy = hauteur / 2 + camera.y * 18;
      const rayonX = largeur * 0.55;
      const rayonY = hauteur * 0.62;

      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      const projetes: { x: number; y: number; a: number }[] = [];

      for (const p of points) {
        const rx = p.x * cos - p.z * sin;
        const rz = p.x * sin + p.z * cos;
        // rz + 1.6 reste dans [0.6, 2.6] : le diviseur est toujours positif.
        const echelle = FOCALE / (FOCALE + (rz + 1.6) * PROFONDEUR);
        const profondeur = (echelle - ECHELLE_MIN) / (ECHELLE_MAX - ECHELLE_MIN);

        projetes.push({
          x: cx + rx * rayonX * echelle,
          y: cy + p.y * rayonY * echelle,
          a: 0.12 + profondeur * 0.55,
        });
      }

      // Liaisons : tracées avant les points pour passer dessous.
      ctx.lineWidth = 1;
      for (let i = 0; i < projetes.length; i++) {
        for (let j = i + 1; j < projetes.length; j++) {
          const dx = projetes[i].x - projetes[j].x;
          const dy = projetes[i].y - projetes[j].y;
          const d = Math.hypot(dx, dy);
          if (d > DISTANCE_LIAISON) continue;

          const force = (1 - d / DISTANCE_LIAISON) * 0.3;
          const alpha = force * Math.min(projetes[i].a, projetes[j].a);
          ctx.strokeStyle = `rgba(76, 201, 240, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(projetes[i].x, projetes[i].y);
          ctx.lineTo(projetes[j].x, projetes[j].y);
          ctx.stroke();
        }
      }

      for (const p of projetes) {
        ctx.fillStyle = `rgba(140, 220, 250, ${(p.a * 0.8).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 0.6 + p.a * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const boucle = (temps: number) => {
      const delta = precedent === 0 ? 16 : Math.min(temps - precedent, 60);
      precedent = temps;

      angle += delta * 0.000055;
      camera.x += (cible.x - camera.x) * 0.045;
      camera.y += (cible.y - camera.y) * 0.045;

      dessiner();
      raf = requestAnimationFrame(boucle);
    };

    const relancer = () => {
      const doitTourner = visible && ongletActif && !mqAnimation.matches;
      if (doitTourner && raf === 0) {
        precedent = 0;
        raf = requestAnimationFrame(boucle);
      } else if (!doitTourner && raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const surSouris = (e: PointerEvent) => {
      if (!mqPointeur.matches) return;
      const rect = canvas.getBoundingClientRect();
      cible.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      cible.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };

    const surVisibilite = () => {
      ongletActif = document.visibilityState === "visible";
      relancer();
    };

    redimensionner();
    dessiner(); // première image immédiate, y compris en animation réduite

    const observateur = new IntersectionObserver(
      ([entree]) => {
        visible = entree.isIntersecting;
        relancer();
      },
      { threshold: 0 }
    );
    observateur.observe(canvas);

    const surRedimension = () => {
      redimensionner();
      dessiner();
    };

    window.addEventListener("resize", surRedimension);
    window.addEventListener("pointermove", surSouris, { passive: true });
    document.addEventListener("visibilitychange", surVisibilite);
    mqAnimation.addEventListener("change", relancer);

    relancer();

    return () => {
      if (raf !== 0) cancelAnimationFrame(raf);
      observateur.disconnect();
      window.removeEventListener("resize", surRedimension);
      window.removeEventListener("pointermove", surSouris);
      document.removeEventListener("visibilitychange", surVisibilite);
      mqAnimation.removeEventListener("change", relancer);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        maskImage:
          "radial-gradient(120% 90% at 50% 35%, #000 35%, rgba(0,0,0,0.35) 68%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(120% 90% at 50% 35%, #000 35%, rgba(0,0,0,0.35) 68%, transparent 100%)",
      }}
    />
  );
}
