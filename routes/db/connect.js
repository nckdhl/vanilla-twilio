const { Pool } = require('pg');
const cfg = require('../../config');

const credentials = {
    user: cfg.dbUser,
    host: cfg.dbHost,
    database: cfg.dbName, 
    password: cfg.dbPassword,
    port: cfg.dbPort,
}

const pool = new Pool(credentials);

module.exports = pool;