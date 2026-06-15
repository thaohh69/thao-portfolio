/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'assets.aceternity.com', 'logo.clearbit.com'],
  },
  eslint: {
    // Ne bloque PAS le build en cas d'erreurs eslint
    ignoreDuringBuilds: true,
  },
  // Enhanced caching configuration for development
  experimental: {
    // Disable aggressive caching in development
    staleTimes: {
      dynamic: 0,
      static: 30,
    },
    // Enable development turbopack optimizations
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Optimize webpack configuration for better cache invalidation
  webpack: (config: any, { dev }: { dev: boolean }) => {
    if (dev) {
      // Enhanced webpack cache configuration - simpler approach
      config.cache = {
        type: 'filesystem',
        // Add timestamp to cache key for better invalidation
        version: `dev-${process.env.NODE_ENV}-${Math.floor(Date.now() / (1000 * 60 * 15))}`, // 15-minute intervals
      };
      
      // Enhanced optimization for development
      config.optimization = {
        ...config.optimization,
        moduleIds: 'named',
        chunkIds: 'named',
        // Disable module concatenation in development for better debugging
        concatenateModules: false,
        // Enable better module replacement
        providedExports: false,
        usedExports: false,
      };

      // Add file watching improvements
      config.watchOptions = {
        ...config.watchOptions,
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: false,
      };

      // Disable persistent caching for problematic modules
      config.module.unsafeCache = false;
    }
    
    return config;
  },
  // Configure headers for better cache control
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: isDev 
              ? 'no-cache, no-store, must-revalidate, max-age=0'
              : 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
          {
            key: 'X-Cache-Control',
            value: 'dev-no-cache',
          },
        ],
      },
      // Add cache control for static assets in development
      ...(isDev ? [{
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      }] : []),
    ];
  },
  // Enhanced development server configuration
  ...(process.env.NODE_ENV === 'development' && {
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    },
  }),
};

module.exports = nextConfig;
