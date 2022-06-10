const express = require("express");
const router = express.Router();
const usersController = require("../controller/users.controller");

router.post("/lend", usersController.lendBook);
router.post("/return", usersController.returnBook);

module.exports = { router };
