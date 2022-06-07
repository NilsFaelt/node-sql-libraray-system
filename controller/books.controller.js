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

async function addBook() {}

module.exports = { getAllBooks, addBook };
