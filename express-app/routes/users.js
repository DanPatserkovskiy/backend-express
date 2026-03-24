const express = require('express');
const router = express.Router();

let id = 1;
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP)`);

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
});

router.get('/:id', function(req, res, next) {
  const {id} = req.params;
  db.all("SELECT id, name FROM users WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
});

router.post('/', function (req, res, next) {
  const {name} = req.body;
  if (!req.body.name) {
    return res.status(400).json({
      message: "Пользователь не обнаружен"
    })
  }
  const newUser = {
    id: id++,
    name: req.body.name,
    email: req.body.email,
    createdAt: new Date()
  };
  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [name]);
  res.status(200).json({newUser})
})

module.exports = router;
