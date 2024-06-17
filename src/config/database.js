const mysql = require("mysql2");

const dbPool = mysql.createPool({
  host: "sql12.freesqldatabase.com",
  user: "sql12714367",
  password: "8csKtDY2yZ",
  database: "sql12714367",
});

module.exports = dbPool.promise();
