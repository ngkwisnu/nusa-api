const mysql = require('mysql2')

const dbPool = mysql.createPool({
    host: 'SG-tour-guide-apps-8584-mysql-master.servers.mongodirector.com',
    user: 'sgroot',
    password: 'TssrFMTJs1Bf,Ow6',
    database: 'nusaguide',
})

module.exports = dbPool.promise()