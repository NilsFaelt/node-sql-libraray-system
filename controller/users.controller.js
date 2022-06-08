const usersModel = require("../model/users.model");

async function getUsers(req, res) {
  const users = await usersModel.getUsers();
  res.send(users);
}

async function registerUser(req, res) {
  if (
    !req.body.name ||
    !req.body.age ||
    !req.body.email ||
    !req.body.username ||
    !req.body.password
  ) {
    res
      .status(404)
      .json({ info: "make sure all fields are filled in corectly" });
    return;
  }
  usersModel.addUser(
    req.body.name,
    req.body.age,
    req.body.email,
    req.body.username,
    req.body.password
  );
  res.status(200).json({ info: "user created", userinfo: req.body });
}

async function loginUser(req, res) {
  usersModel.loginUser(req.body.username, req.body.password);
  res.send("login");
}

module.exports = { getUsers, registerUser, loginUser };
