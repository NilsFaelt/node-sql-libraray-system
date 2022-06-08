const sqlite3 = require("sqlite3").verbose();

const statement = `CREATE TABLE books (title TEXT, author TEXT, genre TEXT, id INTEGER PRIMARY KEY AUTOINCREMENT)`;
// const insert = `INSERT INTO books(title, author, genre, id) VALUES(?,?,?,?) `;

const db = new sqlite3.Database("./db.sqlite", (error) => {
  if (error) {
    console.log(error.message);
  }
});

module.exports = db;
