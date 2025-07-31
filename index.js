const express = require("express"); // Express framework import kiya
const mysql = require("mysql"); // MySQL module import kiya
const app = express(); // Express app banaya
const cors = require("cors");

app.use(cors());

app.use(express.json()); // JSON data read karne ka middleware

// MySQL ke sath connection setup
const db = mysql.createConnection({
  host: "localhost", // XAMPP server
  user: "root", // XAMPP default user
  password: "", // XAMPP default password (blank)
  database: "testdb", // Aapka database ka naam
});

// Database connect karna
db.connect((err) => {
  if (err) {
    console.log("DB Error:", err); // Agar error ho to print kare
  } else {
    console.log("MySQL Connected"); // Warna success message de
  }
});

// ✅ Home route (test karne ke liye)
app.get("/", (req, res) => {
  res.send("API is working!");
});

// ✅ POST route – naya user add karta hai
app.post("/users", (req, res) => {
  // Client se JSON body mein name aur email milega
  const { name, email } = req.body;

  // SQL query banai – ? ke jagah values jaayengi
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";

  // Query run karai
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err }); // Error ho to 500
    }
    res.status(201).json({ message: "User added", id: result.insertId }); // Success
  });
});

// GET /users – sab users list karega
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results); // Saari rows JSON format mein bhej do
  });
});

// PUT /users/:id – user ko update karta hai
app.put("/users/:id", (req, res) => {
  const userId = req.params.id; // URL se id li
  const { name, email } = req.body; // body se naya data liya

  const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  db.query(sql, [name, email, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: "User updated" });
  });
});

// DELETE /users/:id – user ko delete karta hai
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id; // URL se user ID li

  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: "User deleted" });
  });
});

// ✅ Server ko run karaya
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
