const User = require("../models/User");

module.exports = {
  create,
  login,
  getVendors,
  updateUser,
};

//CREATE USER
async function create(req, res) {
  try {
    let token = await User.createUser(req);
    res.status(200).json(token);
  } catch (err) {
    res.status(400);
    res.json({ Error: err });
  }
}

// LOGIN USER
async function login(req, res) {
  try {
    let token = await User.loginUser(req);
    res.status(200).json(token);
  } catch (err) {
    res.status(500);
    res.json("Invalid Credentials");
  }
}

// LOGIN USER
async function getVendors(req, res) {
  try {
    let data = await User.getVendors();
    res.status(200).json(data);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}



// UPDATE USER
async function updateUser(req, res) {
  try {
    let data = await User.updateUser(req);
    res.status(200).json(data);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}
