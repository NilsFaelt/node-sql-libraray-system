const express = require("express");
const router = express.Router();
const usersController = require("../controller/users.controller");

router.post("/lend", usersController.lendBook);
router.post("/return", (req, res) => {
  res.send("return");
});

module.exports = { router };
