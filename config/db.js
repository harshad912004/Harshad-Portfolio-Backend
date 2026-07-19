const mysql = require('mysql2/promise');
require('dotenv').config();

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

// Create the connection pool
const pool = mysql.createPool(urlDB);

module.exports = pool;