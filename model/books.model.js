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
    db.run(sqlDelete, (error) => {
      if (error) {
        console.log(error.message);
      }
      console.log("succesfully deleted");
    });
  });
}

function updateBookPartial(id, newTitle) {
  console.log(newTitle);
  const updateSql = `UPDATE books SET title = '${newTitle}' WHERE id = ${id}`;
  db.run(updateSql);
}

function changeBookFull(id, title, author, genre) {
  const updateSql = `UPDATE books SET title = '${title}', author = '${author}', genre = '${genre}'  WHERE id = ${id}`;
  if (!title) {
    console.log("failure");
    return;
  }
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
