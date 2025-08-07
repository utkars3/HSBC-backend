import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = () => {
  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  connection.connect((err) => {
    if (err) {
      console.error(`MySQL connection error: ${err.message}`);
      process.exit(1);
    }
    console.log(`MySQL connected: ${connection.config.host}`);
  });

  return connection;
};

export default connectDB;
