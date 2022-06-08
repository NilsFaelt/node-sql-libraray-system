const booksModel = require("../model/books.model");

async function getAllBooks(req, res) {
  const books = await booksModel.getAll();
  if (!books) {
    res.status(404).json({ info: "Couldtn get books" });
    return;
  }
  res.status(200).json({ books: books });
}

async function getOneBook(req, res) {
  const book = await booksModel.getOneBook(req.params.id);
  if (!book) {
    res.status(404).json({ info: "couldnt find book make sure id is valid" });
    return;
  }
  res.status(200).json({ info: "book found", book: book });
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
  const book = await booksModel.getOneBook(req.params.id);
  await booksModel.deltedBook(req.params.id);
  if (book) {
    res.status(200).json({ info: "succesfully deleted", book: book });
  } else {
    res.status(404).json({
      info: "couldnt delet book make sure id is valid, and that book exists",
    });
  }
}

async function updatePartialBook(req, res) {
  const book = await booksModel.getOneBook(req.params.id);
  if (!req.params.id || (!req.body.title && book)) {
    res
      .status(404)
      .json({ info: "make sure both id and title is corecctly passed in" });
  }
  booksModel.updateBookPartial(req.params.id, req.body.title);
  res.status(200).json({ info: "book succesfully updated", updated: req.body });
}

async function updateBookFull(req, res) {
  const book = await booksModel.getOneBook(req.params.id);
  if (
    !req.params.id ||
    !req.body.title ||
    !req.body.author ||
    (!req.body.genre && book)
  ) {
    res.status(404).json({
      info: "make sure id, title, author and genre is corecctly passed in",
    });
  }
  booksModel.changeBookFull(
    req.params.id,
    req.body.title,
    req.body.author,
    req.body.genre
  );
  res.status(200).json({ info: "book succesfully updated", updated: req.body });
}
module.exports = {
  getAllBooks,
  addBook,
  deleteBook,
  updatePartialBook,
  getOneBook,
  updateBookFull,
};
