const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const bookRouter = require("./routes/booksRouter");

app.get("/", (req, res) => {
  res.send("welcome to the library sytem");
});

app.use("/books", bookRouter.router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// GET /books - Hämta alla böcker
// GET /books/:id - Hämta en bok
// POST /books - Skapa en bok
// PUT /books/:id - Ändra en bok (full)
// PATCH /books/:id - Ändra en bok (partial)
// DELETE /books/:id - Ta bort en bok
