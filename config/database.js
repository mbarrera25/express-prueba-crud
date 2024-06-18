const { Pool } = require('pg');

const pool = new Pool({
  user: USER_DB,
  host: HOST_DB,
  database: NAME_DB,
  password: PASSWORD_DB,
  port: PORT_DB
});

module.exports = pool;