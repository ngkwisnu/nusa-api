const mysql = require('mysql2')

const dbPool = mysql.createPool({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12711009',
    password: 'bdBCA6Uxua',
    database: 'sql12711009',
})

module.exports = dbPool.promise()