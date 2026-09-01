/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  // Le dossier parent contient un package-lock.json orphelin : on fixe
  // explicitement la racine pour éviter que Next remonte trop haut.
  turbopack: { root: import.meta.dirname },
  // Export statique : le site est déployable sur Vercel, GitHub Pages, Netlify
  // ou n'importe quel hébergeur de fichiers, sans serveur Node.
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
