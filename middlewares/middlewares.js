const db = require("../db/db");

function getOne(req, res, next) {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE id = ${id}`;
  db.get(sql, (error, rows) => {
    if (error) {
      console.error(error.message);
      return;
    }
    const book = rows;
    console.log(book);
    if (book) {
      next();
    } else {
      res
        .status(404)
        .json({ info: "couldnt find book make sure id is correct" });
    }
  });
}

function checkIfUserExists(req, res, next) {
  const sql = `SELECT * FROM users WHERE username = ? OR email = ?`;
  db.get(sql, [req.body.username, req.body.email], (error, rows) => {
    if (error) {
      console.error(error.message);
      return;
    }
    const user = rows;
    console.log(user);
    if (user) {
      res.status(404).json({ info: "username or email already exists" });
    } else {
      next();
    }
  });
}

module.exports = { getOne, checkIfUserExists };
