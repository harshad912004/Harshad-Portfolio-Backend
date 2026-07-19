const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 5000;

// Test DB Connection before starting the server
async function startServer() {
  try {
    // Attempt to get a connection from the pool
    const connection = await db.getConnection();
    // console.log('MySQL database connected successfully.');
    connection.release();

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`CORS allowed origin: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`);
    });
  } catch (error) {
    console.error('Database connection failed. Server not started.', error);
    process.exit(1);
  }
}

startServer();
