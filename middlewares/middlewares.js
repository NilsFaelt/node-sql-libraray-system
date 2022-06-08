const db = require("../db/db");

function getOne(req, res, next) {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE id = ${id}`;
  db.get(sql, (error, rows) => {
    if (error) {
      console.error(error.message);
      return;
    }
    console.log(rows);
  });

  next();
}

module.exports = { getOne };
