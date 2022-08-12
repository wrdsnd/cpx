module.exports = {
  client: {
    service: {
      name: 'cutepix',
      localSchemaFile: './server/src/schema.graphql'
    },
    includes: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './providers/**/*.{ts,tsx}'],
    excludes: ['**/node_modules', '**/__tests__/**/*'],
    skipSSLValidation: true,
  },
}
