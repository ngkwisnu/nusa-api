const mysql = require('mysql2')

const dbPool = mysql.createPool({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12712970',
    password: 'U5cb1ETEjs',
    database: 'sql12712970',
})

module.exports = dbPool.promise()