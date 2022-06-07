const res = require("express/lib/response");
const booksModel = require("../model/books.model");

async function getAllBooks(req, res) {
  const books = await booksModel.getAll();
  if (!books) {
    res.status(404).json({ info: "Couldtn get books" });
  }
  console.log(books, "booooooooooooks");
  res.status(200).json({ books: books });
}

function addBook(req, res) {
  if (!req.body.author || !req.body.title || !req.body.genre) {
    res.status(404).json({
      info: "couldnt post book, make sure evrything is filled in correct",
      input: req.body,
    });
  }
  booksModel.addBook(req.body.title, req.body.author, req.body.genre);
  res
    .status(200)
    .json({ info: "book successfully added", bookAdded: req.body });
}

module.exports = { getAllBooks, addBook };
