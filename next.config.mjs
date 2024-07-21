/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com'], // Add the domain of the image source here
        unoptimized: true,
      },
      eslint: {
          ignoreDuringBuilds: true,
      },
      typescript: {
          ignoreBuildErrors: true,
      },
      experimental: {
          serverActions: true
      },
      async redirects() {
        return [
          // Basic redirect
          {
            source: '/',
            destination: '/dashboard',
            permanent: true,
          },
        ]
      },
};


export default nextConfig;