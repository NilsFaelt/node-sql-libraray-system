const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const bookRouter = require("./routes/booksRouter");
const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/usersRouter");
const usersInfoRouter = require("./routes/usersInfoRouter");

app.get("/", (req, res) => {
  res.send("welcome to the library sytem");
});

app.use("/books", bookRouter.router);
app.use("/auth", authRouter.router);
app.use("/users", usersRouter.router);
app.use("/me", usersInfoRouter.router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
