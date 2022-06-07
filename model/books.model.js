const { json } = require("express/lib/response");
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

function updateBookPartial(id, title) {
  const newTitle = title;
  console.log(newTitle);
  const updateSql = `UPDATE books SET title = ${newTitle} WHERE id = ${id}`;
  console.log(id, newTitle);
  db.run(updateSql);
}

module.exports = { getAll, addBook, deltedBook, updateBookPartial };
