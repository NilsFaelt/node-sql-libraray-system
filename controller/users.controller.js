const usersModel = require("../model/users.model");
const bookModel = require("../model/books.model");
const jwt = require("jsonwebtoken");

async function getUsers(req, res) {
  const users = await usersModel.getUsers();
  res.send(users);
}

async function registerUser(req, res) {
  if (
    !req.body.name ||
    !req.body.age ||
    !req.body.email ||
    !req.body.username ||
    !req.body.password
  ) {
    res
      .status(404)
      .json({ info: "make sure all fields are filled in corectly" });
    return;
  }
  usersModel.addUser(
    req.body.name,
    req.body.age,
    req.body.email,
    req.body.username,
    req.body.password
  );
  res.status(200).json({ info: "user created", userinfo: req.body });
}

async function loginUser(req, res) {
  const user = await usersModel.loginUser(req.body.username, req.body.password);
  if (user) {
    const token = jwt.sign({ user }, process.env.ACCES_TOKEN_SECRET);
    res.json({ jwtToken: token });
  } else {
    res.status(404).json({
      info: "couldnt login, make sure username and password is correct",
    });
  }
}

async function lendBook(req, res) {
  let lendedBook = await bookModel.lendBook(req.body.title);
  if (lendedBook) {
    lendedBook.usersid = req.body.userId;
    await bookModel.lendedBooks(
      lendedBook.title,
      lendedBook.author,
      lendedBook.genre,
      lendedBook.usersid
    );
    res.status(200).json({ info: "book lended", lendedBook: lendedBook });
  } else if (!lendedBook) {
    res.status(404).json({ info: "couldnt find book, make sure book exists" });
  }
}

async function getUsersInfo(req, res) {
  let book;
  const user = await usersModel.getUser(req.body.userId);
  console.log(user);
  if (user) {
    book = await bookModel.lendedBook(user.id);
  }
  console.log(book);
  if (user && book) {
    res.status(200).json({ user: user, lendedBooks: book });
    return;
  } else if (user) {
    res.status(200).json({ user: user, lendedBooks: "no books lended" });
    return;
  }
  res.status(404).json({ info: " couldnt find user" });
}

async function returnBook(req, res) {
  const deletedBook = await bookModel.lendedBook(req.body.userId);
  if (!deletedBook) {
    res.status(404).json({
      info: "couldnt find book to return, make sure evrything is correct",
    });
    return;
  }
  bookModel.returnBook(req.body.userId);
  res.status(200).json({ returnedBook: deletedBook });
}

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  lendBook,
  getUsersInfo,
  returnBook,
};
