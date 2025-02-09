/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mailgo-rho.vercel.app',
        port: '',
        pathname: '/_next/**',
      },
    ],
  },
}

module.exports = nextConfig 