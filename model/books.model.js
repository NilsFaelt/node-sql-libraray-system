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
function lendBook(title) {
  const sql = `SELECT * FROM books WHERE title = ? `;
  return new Promise((resolve, reject) => {
    db.get(sql, [title], (error, rows) => {
      if (error) {
        console.log(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}
function lendedBook(id) {
  const sql = `SELECT * FROM lendedbooks WHERE usersid = ?`;
  return new Promise((resolve, reject) => {
    db.get(sql, [id], (error, rows) => {
      if (error) {
        console.log(error.message);
        reject(error);
      }
      resolve(rows);
      console.log(rows, "rowsss");
    });
  });
}

function lendedBooks(title, author, genre, usersid) {
  const insert = `INSERT INTO lendedbooks(title, author, genre, usersid) VALUES(?,?,?,?)`;
  return new Promise((resolve, reject) => {
    db.get(insert, [title, author, genre, usersid], (error, rows) => {
      if (error) {
        console.log(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function returnBook(usersid) {
  const insert = `DELETE FROM lendedbooks WHERE usersid = ${usersid}`;
  return new Promise((resolve, reject) => {
    db.run(insert, (error, rows) => {
      if (error) {
        console.log(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

module.exports = {
  getAll,
  addBook,
  deltedBook,
  updateBookPartial,
  getOneBook,
  changeBookFull,
  lendBook,
  lendedBook,
  lendedBooks,
  returnBook,
};
