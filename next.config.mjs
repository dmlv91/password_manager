/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
          {
            protocol: 'https',
            hostname: "images.pexels.com"
          }
        ]
      },
    experimental: {
      serverActions: {
        bodySizeLimit: '3mb',
      },
    },
};

export default nextConfig;
