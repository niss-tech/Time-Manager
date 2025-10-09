import express from "express";
import { pool } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend API is running ✅");
});

app.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Table not ready" });
  }
});

app.listen(PORT, () => console.log(`🚀 API running on port ${PORT}`));
