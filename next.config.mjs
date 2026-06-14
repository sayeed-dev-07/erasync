/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.1.108'],

  // Add this new images block
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.**.**',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'candcgc.us',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;