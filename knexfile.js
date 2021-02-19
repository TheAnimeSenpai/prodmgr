const dotenv = require('dotenv');
const path = require('path');

let _path =
  process.env.NODE_ENV === 'test' ? `.env.${process.env.NODE_ENV}` : '.env';

dotenv.config({ path: path.resolve(__dirname, _path) });

const dbSettings = {
  client: 'mysql',
  connection: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  migrations: {
    directory: './db/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

// Update with your config settings.
module.exports = {
  test: {
    ...dbSettings,
    migrations: {
      directory: './tests/db/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './tests/db/seeds',
    },
  },

  development: {
    ...dbSettings,
  },

  staging: {
    ...dbSettings,
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    ...dbSettings,
    pool: {
      min: 2,
      max: 10,
    },
  },
};
