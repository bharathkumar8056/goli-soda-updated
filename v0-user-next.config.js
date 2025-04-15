/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  // Disable server components for pages with 3D content
  experimental: {
    serverComponentsExternalPackages: ["three"],
  },
}

module.exports = nextConfig
