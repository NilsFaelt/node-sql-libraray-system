const express = require("express");
const router = express.Router();

const usersController = require("../controller/users.controller");

router.post("/register", usersController.registerUser);
router.post("/login", (req, res) => {
  res.send("login");
});
router.get("/getusers", usersController.getUsers);

module.exports = { router };
