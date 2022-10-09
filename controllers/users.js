const User = require("../models/User");

module.exports = {
  create,
  login,
};

//CREATE USER
async function create(req, res) {
  try {
    let token = await User.createUser(req);
    res.status(200).json(token);
  } catch (err) {
    res.status(500).json(err);
  }
}

// LOGIN USER 
async function login(req, res) {
  try {
    let token = await User.loginUser(req)
    res.status(200).json(token);
  } catch(err) {
    res.status(500)
    res.json('Invalid Credentials')
  }
}
