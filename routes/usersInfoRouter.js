const express = require("express");
const router = express.Router();
const usersController = require("../controller/users.controller");

router.get("/", usersController.getUsersInfo);

module.exports = { router };
