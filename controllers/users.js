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
    res.status(400)
    res.json({'Error':err});
  }
}

// LOGIN USER
async function login(req, res) {
  try {
    let token = await User.loginUser(req);
    res.status(200).json(token);
  } catch (err) {
    res.status(500)
    res.json("Invalid Credentials")
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

    let user = await User.findById(req.body.userId);
    if(user){
      user.name = req.body.name ? req.body.name : user.name;
      user.email = req.body.email ? req.body.email : user.email;
      user.image = req.body.image ? req.body.image : user.image;
      await user.save();
      res.status(200).json('Successfully updated user');
    }

  } catch (err) {
    console.log(err)
    res.status(500);
    res.json(err);
  }
}
