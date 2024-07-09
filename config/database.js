const { Pool } = require('pg');

const pool = new Pool({
  user: 'eroom',
  host: 'localhost',
  database: 'lba',
  password: 'pms',
  port: 5432
});

module.exports = pool;