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

module.exports = { getOne };
