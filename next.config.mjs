/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // byq-supply CDN imagery used in elevated marketing sections (placeholder photography)
      { protocol: "https", hostname: "byqsupply-components.netlify.app" },
      // Foto's uit Forester (Firebase Storage), zoals de auto's die Leroy via Q toevoegt.
      { protocol: "https", hostname: "firebasestorage.googleapis.com", pathname: "/v0/b/webgrowth-company-lzz4e6.firebasestorage.app/o/**" },
    ],
  },
  async redirects() {
    return [
      // /inkoop heette zo tot 2026-09-07. Leroy wil het woord "inkoop" niet
      // gebruiken: inkopen doen ze wel, maar op eigen initiatief.
      { source: "/inkoop", destination: "/inruil", permanent: true },
    ];
  },
};

export default nextConfig;
