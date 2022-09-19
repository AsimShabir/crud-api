const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root1",
  password: "Root$123",
  database: "crud-contact",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extends: true }));
app.get("/api/get", (req, res) => {
  const sqlGet = "select * from contact_db";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});
app.post("/api/post", (req, res) => {
  const { name, email, contact } = req.body;
  const sqlInsert =
    "INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";
  db.query(sqlInsert, [name, email, contact], (err, result) => {
    if (err) {
      console.log("error", err);
    }
  });
});
app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlremove = "DELETE FROM contact_db WHERE id=?";
  db.query(sqlremove, id, (err, result) => {
    if (err) {
      console.log("error", err);
    }
  });
});
app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlget = "SELECT * FROM contact_db WHERE id=?";
  db.query(sqlget, id, (err, result) => {
    if (err) {
      console.log("error", err);
    }
  });
});
app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  const sqlupdate =
    "UPDATE contact_db SET name=?,email=?, contact=? WHERE id=?";
  db.query(sqlupdate, [name, email, contact, id], (err, result) => {
    if (err) {
      console.log("error", err);
    }
  });
});

app.listen(3000, () => {
  console.log("server is runing on port 3000");
});
