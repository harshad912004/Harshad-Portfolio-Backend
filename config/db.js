const mysql = require('mysql2/promise');
require('dotenv').config();

// Create the connection pool
const pool = mysql.createPool({
     host: process.env.MYSQLHOST,
     user: process.env.MYSQLUSER,
     password: process.env.MYSQLPASSWORD,
     database: process.env.MYSQLDATABASE,
     port: process.env.MYSQLPORT,
     waitForConnections: true,
     connectionLimit: 10,
     queueLimit: 0,
});

module.exports = pool;

// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

// // Create the connection pool
// const pool = mysql.createPool(urlDB);

// module.exports = pool;