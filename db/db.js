const sqlite3 = require("sqlite3").verbose();

const statement = `CREATE TABLE books (title TEXT, author TEXT, genre TEXT, id INTEGER PRIMARY KEY AUTOINCREMENT)`;
const createUserTable = `CREATE TABLE users(name TEXT, age INTEGER, email TEXT, username TEXT, password TEXT, id INTEGER PRIMARY KEY AUTOINCREMENT )`;
// const insert = `INSERT INTO books(title, author, genre, id) VALUES(?,?,?,?) `;
const insert = `INSERT INTO users(name, age, email, username, password, id)VALUES(?,?,?,?,?,?)`;

const db = new sqlite3.Database("./db.sqlite", (error) => {
  if (error) {
    console.log(error.message);
  }
  //   db.run(createUserTable);
  //   console.log(`db were created`);
});

// db.run(insert, ["Nils", 33, "nils@gmail.com", "nilser", "nils123"], (error) => {
//   if (error) {
//     console.log(error.message);
//   }
//   console.log("table created");
// });

module.exports = db;
