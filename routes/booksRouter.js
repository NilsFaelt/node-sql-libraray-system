const express = require("express");
const router = express.Router();
const booksController = require("../controller/books.controller");

router.get("/", booksController.getAllBooks);
router.get("/:id", (req, res) => {
  res.send("get one book");
});
router.post("/", booksController.addBook);

router.put("/:id", (req, res) => {
  res.send("change book");
});
router.patch("/:id", (req, res) => {
  res.send("change book full");
});
router.delete("/:id", (req, res) => {
  res.send(" delete book ");
});

module.exports = { router };
