import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "time_manager",
  waitForConnections: true,
  connectionLimit: 10, // number of simultaneous connections
  queueLimit: 0,
});

console.log("✅ MariaDB pool created");
