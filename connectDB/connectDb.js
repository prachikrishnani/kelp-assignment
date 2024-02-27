const { Client } = require('pg')
const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.PG_USER);
const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})

module.exports = client