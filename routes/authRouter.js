const express = require("express");
const router = express.Router();

const usersController = require("../controller/users.controller");
const middleWares = require("../middlewares/middlewares");

router.post(
  "/register",
  middleWares.checkIfUserExists,
  usersController.registerUser
);
router.post("/login", usersController.loginUser);
router.get("/getusers", usersController.getUsers);

module.exports = { router };
