const mysql = require('mysql2/promise');
require('dotenv').config();

// Create the connection pool
const pool = mysql.createPool({
     host: process.env.MYSQLHOST,
     user: process.env.MYSQLUSER,
     password: process.env.MYSQLPASSWORD,
     database: process.env.MYSQLDATABASE,
     port: Number(process.env.MYSQLPORT) || 3306,
     waitForConnections: true,
     connectionLimit: 10,
     queueLimit: 0,
});

module.exports = pool;