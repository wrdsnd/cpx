require('dotenv').config()

module.exports = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  migrationsRun: true,
  synchronize: false,
  logging: ['schema', 'error', 'warn', 'info', 'log'],
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/postgresql/*.js'],
  subscribers: ['.//subscriber/*.js'],
  cli: {
    entitiesDir: './src/entity',
    migrationsDir: './migrations/postgresql',
    subscribersDir: './src/subscriber',
  },
}
