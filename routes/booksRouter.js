const express = require("express");
const router = express.Router();
const booksController = require("../controller/books.controller");

router.get("/", booksController.getAllBooks);
router.get("/:id", booksController.getOneBook);
router.post("/", booksController.addBook);

router.put("/:id", (req, res) => {
  res.send("change book");
});
router.patch("/:id", booksController.updatePartialBook);
router.delete("/:id", booksController.deleteBook);

module.exports = { router };
