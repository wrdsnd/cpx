require('dotenv').config()

module.exports = {
  client: {
    service: {
      name: 'cutepix',
      url: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    },
    includes: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
    excludes: ['**/node_modules', '**/__tests__/**/*'],
    skipSSLValidation: true,
  },
}
