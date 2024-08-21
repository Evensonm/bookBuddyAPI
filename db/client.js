const pg = require("pg");
console.log(process.env.DB_NAME);

const client = new pg.Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

console.log(client);

module.exports = client;