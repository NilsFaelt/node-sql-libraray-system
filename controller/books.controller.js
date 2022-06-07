const res = require("express/lib/response");
const booksModel = require("../model/books.model");

async function getAllBooks(req, res) {
  const books = await booksModel.getAll();
  if (!books) {
    res.status(404).json({ info: "Couldtn get books" });
  }
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

async function deleteBook(req, res) {
  const book = await booksModel.deltedBook(req.params.id);
  if (book) {
    res.status(200).json({ info: "succesfully deleted", book: book });
  } else {
    res.status(404).json({
      info: "couldnt delet book make sure id is valid, and that book exists",
    });
  }
}

function updatePartialBook(req, res) {
  booksModel.updateBookPartial(req.params.id, req.body.title);
  res.send(req.params.id);
}
module.exports = { getAllBooks, addBook, deleteBook, updatePartialBook };
