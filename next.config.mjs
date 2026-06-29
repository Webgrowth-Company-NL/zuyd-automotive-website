/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // byq-supply CDN imagery used in elevated marketing sections (placeholder photography)
      { protocol: "https", hostname: "byqsupply-components.netlify.app" },
    ],
  },
};

export default nextConfig;
