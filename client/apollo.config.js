require('dotenv').config()

module.exports = {
  client: {
    service: {
      name: 'cutepix',
      url: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    },
    includes: ['./client/pages/**/*.{ts,tsx}', './client/components/**/*.{ts,tsx}'],
    excludes: ['**/node_modules', '**/__tests__/**/*'],
    skipSSLValidation: true,
  },
}
