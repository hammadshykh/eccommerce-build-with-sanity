/** @type {import('next').NextConfig} */
const nextConfig = {
 reactStrictMode: false,
 images: {
  remotePatterns: [
   {
    protocol: "https",
    hostname: "cdn.sanity.io",
   },
   {
    protocol: "https",
    hostname: "firebasestorage.googleapis.com",
   },
  ],
  domains: ["firebasestorage.googleapis.com", "cdn.sanity.io"],
 },
};

export default nextConfig;
