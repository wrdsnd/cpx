require('dotenv').config()

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'enabled',
})

const config = {
   async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
        },
      ]
    },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/feed',
        permanent: true,
      },
    ]
  },
  typescript: { ingoreDevErrors: true, transpileOnly: true },
  images: {
    domains: ["pbs.twimg.com", "abs.twimg.com"]
  }
}

module.exports = withBundleAnalyzer(config)
