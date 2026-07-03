/** @type {import('next').NextConfig} */
const nextConfig = {
  // ============================================
  // OUTPUT & BUILD
  // ============================================
  output: 'standalone', // 'standalone' untuk server, 'export' untuk static
  distDir: '.next',

  // ============================================
  // IMAGES
  // ============================================
  images: {
    unoptimized: true,
    domains: [
      'localhost',
      'vercel.app',
      'github.com',
      'images.unsplash.com',
      'ui-avatars.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // ============================================
  // TRAILING SLASH
  // ============================================
  trailingSlash: false,

  // ============================================
  // REACT STRICT MODE
  // ============================================
  reactStrictMode: true,

  // ============================================
  // COMPRESSION
  // ============================================
  compress: true,

  // ============================================
  // POWERED BY HEADER
  // ============================================
  poweredByHeader: false,

  // ============================================
  // EXPERIMENTAL FEATURES
  // ============================================
  experimental: {
    optimizePackageImports: [
      'react',
      'react-dom',
      'framer-motion',
      'recharts',
      'date-fns',
    ],
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost:3000'],
    },
  },

  // ============================================
  // TYPESCRIPT & ESLINT
  // ============================================
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // ============================================
  // WEBPACK CONFIG
  // ============================================
  webpack: (config, { isServer, dev }) => {
    // Resolve alias
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };

    // Optimize bundle
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-is)[\\/]/,
            name: 'react',
            chunks: 'all',
          },
          ui: {
            test: /[\\/]node_modules[\\/](@radix-ui|class-variance-authority|clsx)[\\/]/,
            name: 'ui',
            chunks: 'all',
          },
        },
      };
    }

    return config;
  },

  // ============================================
  // REDIRECTS
  // ============================================
  async redirects() {
    return [
      {
        source: '/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/learn',
        destination: '/learning',
        permanent: true,
      },
      {
        source: '/dashboard',
        destination: '/progress',
        permanent: true,
      },
      {
        source: '/quiz',
        destination: '/daily',
        permanent: true,
      },
    ];
  },

  // ============================================
  // REWRITES
  // ============================================
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },

  // ============================================
  // HEADERS
  // ============================================
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },

  // ============================================
  // ENV VARIABLES (Public)
  // ============================================
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Data Analyst Learning',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
};

module.exports = nextConfig;
