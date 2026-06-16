/** @type {import('next').NextConfig} */
const nextConfig = {
  // BFF mode — solo API routes
  experimental: {
    externalDir: false,
  },
}

module.exports = nextConfig
