import type { NextConfig } from 'next'

// Im Dev-Modus laeuft der Tina-Server auf einem eigenen Port und ist nur ueber
// das Loopback-Interface erreichbar. Die Admin-Oberflaeche wuerde ihn direkt
// unter http://localhost:4001 ansprechen - das zeigt im Browser eines anderen
// Rechners ins Leere. Deshalb laeuft im Dev-Modus alles ueber den Ursprung der
// Seite und wird hier weitergereicht. Die feste IPv4-Adresse kommt aus
// build.host in tina/config.tsx - eckige Klammern fuer IPv6 kann Next in
// einem Rewrite-Ziel nicht parsen, dort startet der Doppelpunkt einen Parameter.
const isDev = process.env.NODE_ENV === 'development'
const tinaServer = `http://127.0.0.1:${process.env.TINA_DEV_PORT ?? '4001'}`
 
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.tina.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      }
    ],
  },
  async headers() {
    // these are also defined in the root layout since github pages doesn't support headers
    const headers = [
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'Content-Security-Policy',
        value: "frame-ancestors 'self'",
      },
    ];
    return [
      {
        source: '/(.*)',
        headers,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
      // Nur im Dev-Modus. Der Produktions-Build ist ein statischer Export,
      // dort gibt es weder Rewrites noch einen Tina-Server.
      ...(isDev
        ? [
            { source: '/admin/:path*', destination: `${tinaServer}/admin/:path*` },
            { source: '/graphql', destination: `${tinaServer}/graphql` },
            { source: '/media', destination: `${tinaServer}/media` },
            { source: '/media/:path*', destination: `${tinaServer}/media/:path*` },
            { source: '/altair', destination: `${tinaServer}/altair` },
          ]
        : []),
    ];
  },
};

export default nextConfig