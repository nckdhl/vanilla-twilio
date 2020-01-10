const { Pool } = require('pg');
const cfg = require('../../config');

const credentials = {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
}

const pool = new Pool(credentials);

module.exports = pool;