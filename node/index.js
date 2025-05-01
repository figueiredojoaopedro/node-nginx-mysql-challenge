const express = require("express");
const path = require("path");
const mysql = require("mysql2/promise");

const connectionConfig = {
  host: "db",
  user: "root",
  password: "root",
  database: "db",
};

const app = express();
const port = 3000;

(async () => {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    console.info("Connected as id", connection.id);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE
      )
    `);

    const [rows] = await connection.query(
      `SELECT * FROM users WHERE email = ?`,
      ["joao3@gmail.com"]
    );

    if (rows.length === 0) {
      await connection.query(`INSERT INTO users (name, email) VALUES (?, ?)`, [
        "joao",
        "joao@gmail.com",
      ]);

      console.log("User Inserted!");
    } else {
      console.log("User already exists!");
    }

    console.log("User Inserted!");
    connection.end();
  } catch (err) {
    console.error("DB error:", err);
  }
})();

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "index.html"));
});

app.get("/users", async (req, res) => {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    const [rows] = await connection.query("SELECT * FROM users");
    await connection.end();
    res.status(200).json({ users: rows });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});
app.listen(port, () => {
  console.info("Running in the port: ", port);
});
