const express = require("express");
const router = express.Router();

router.post("/lend", (req, res) => {
  res.send("lend");
});
router.post("/return", (req, res) => {
  res.send("return");
});

module.exports = { router };
