const db = require("../db/db");
const md5 = require("md5");

function getUsers() {
  const sql = `SELECT * FROM users`;
  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.log(error.message);
        reject(error);
      }
      console.log(rows);
      resolve(rows);
    });
  });
}

function addUser(name, age, email, username, password) {
  const addUserSql = `INSERT INTO users(name, age, email, username, password, id) VALUES(?,?,?,?,?,?)`;
  return new Promise((resolve, reject) => {
    db.run(
      addUserSql,
      [name, age, email, username, md5(password)],
      (error, rows) => {
        if (error) {
          console.log(error.message);
          reject(error);
        }
        resolve(rows);
      }
    );
  });
}

module.exports = { getUsers, addUser };
