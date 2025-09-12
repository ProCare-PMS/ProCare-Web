/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  output: 'standalone',
  
  productionBrowserSourceMaps: false,
  
  images: {
    domains: ["images.unsplash.com"],
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400,
  },
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Enhanced experimental features (Next.js 15 compatible)
  experimental: {
    serverActions: {},
    // Remove optimizeCss as it's causing the critters dependency issue
    // optimizeCss: true,
    esmExternals: true,
  },
  
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
    ];
  },
  
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }
    
    return config;
  },
};

export default nextConfig;