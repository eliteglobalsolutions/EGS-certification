/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/index.html', destination: '/en', permanent: true },
      { source: '/v3.html', destination: '/en', permanent: true },
      { source: '/:path*.html', destination: '/en', permanent: true },
    ];
  },
};

export default nextConfig;
