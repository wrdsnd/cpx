const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'enabled',
})

const config = {
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
}

module.exports = withBundleAnalyzer(config)
