import express from "express";
import pkg from "pg";
import fetch from "node-fetch";
import cors from "cors";

const { Pool } = pkg;
const app = express();
const port = 3000;

app.use(cors());

// Set up PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgresql",
  port: 5432,
});

app.get("/api/data", async (req, res) => {
  // Fetching data from WazirX API
  const response = await fetch("https://api.wazirx.com/api/v2/tickers");
  const data = await response.json();

  // Extracting top 10 results
  const top10 = Object.values(data).slice(0, 10);

  // Store results in a database postgresql
  top10.forEach(async (item) => {
    await pool.query(
      "INSERT INTO crypto_data(name, last, buy, sell, volume, base_unit) VALUES($1, $2, $3, $4, $5, $6)",
      [item.name, item.last, item.buy, item.sell, item.volume, item.base_unit]
    );
  });

  // Sending data to frontend
  const result = await pool.query("SELECT * FROM crypto_data");
  res.json(result.rows);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
