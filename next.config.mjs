/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'bope.cl' }],
        destination: 'https://www.bope.cl/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
