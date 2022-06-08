const res = require("express/lib/response");
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
  // make sure id exists
  console.log(newTitle);
  const updateSql = `UPDATE books SET title = '${newTitle}' WHERE id = ${id}`;
  db.run(updateSql);
}

function changeBookFull(id, title, author, genre) {
  // make sure id exists
  const updateSql = `UPDATE books SET title = '${title}', author = '${author}', genre = '${genre}'  WHERE id = ${id}`;
  db.run(updateSql, (err) => {
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
