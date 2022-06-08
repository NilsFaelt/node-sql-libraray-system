const db = require("../db/db");

function getAll() {
  const sql = `SELECT * FROM books`;
  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      }
      console.log(rows);
      resolve(rows);
    });
  });
}

function getOneBook(id) {
  const sql = `SELECT * FROM books WHERE id = ${id}`;
  return new Promise((resolve, reject) => {
    db.get(sql, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      }
      console.log(rows);
      resolve(rows);
    });
  });
}

function addBook(title, author, genre) {
  const insert = `INSERT INTO books(title, author, genre, id) VALUES(?,?,?,?) `;
  db.run(insert, [title, author, genre]);
}

function deltedBook(id) {
  const sqlDelete = `DELETE FROM books WHERE id = ${id}`;

  return new Promise((resolve, reject) => {
    db.run(sqlDelete, (error) => {
      if (error) {
        console.log(error.message);
        reject(error);
      }
      console.log("succesfully deleted");
      resolve();
    });
  });
}

function updateBookPartial(id, newTitle) {
  const updateSql = `UPDATE books SET title = ? WHERE id = ?`;
  db.run(updateSql, [newTitle, id]);
}

function changeBookFull(id, title, author, genre) {
  const updateSql = `UPDATE books SET title = ?, author = ?, genre = ? WHERE id = ?`;
  db.run(updateSql, [title, author, genre, id], (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("suceefully updated book");
  });
}

module.exports = {
  getAll,
  addBook,
  deltedBook,
  updateBookPartial,
  getOneBook,
  changeBookFull,
};
