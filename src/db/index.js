const { Client } = require('pg');
const cfg = require('../../config');

const credentials = {
    user: cfg.dbUser,
    host: cfg.dbHost,
    database: cfg.dbName, 
    password: cfg.dbPassword,
    port: cfg.dbPort,
}

const client = new Client(credentials);

module.exports = client;