const sqlite3 = require("sqlite3").verbose();

// const statement = `CREATE TABLE lendedbooks (title TEXT, author TEXT, genre TEXT, usersid INTEGER)`;
// const createUserTable = `CREATE TABLE users(name TEXT, age INTEGER, email TEXT, username TEXT, password TEXT, id INTEGER PRIMARY KEY AUTOINCREMENT )`;
// const insert = `INSERT INTO lendedbooks(title, author, genre, usersid) VALUES(?,?,?,?) `;
// const insert = `INSERT INTO users(name, age, email, username, password, id)VALUES(?,?,?,?,?,?)`;

const db = new sqlite3.Database("./db.sqlite", (error) => {
  if (error) {
    console.log(error.message);
  }
});

module.exports = db;
