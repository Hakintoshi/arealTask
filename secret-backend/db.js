const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: "kolo",
    host: "localhost",
    port: 5432,
    database: "secret"
})

module.exports = pool