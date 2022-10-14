const mongoose = require("mongoose");
const jwt = require("jsonwebtoken"); // import the jwt library
const bcrypt = require("bcrypt"); // import the bcrypt library



//USER SCHEMA MODEL 

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: {
      type: String,
      unique: true,
      trim: true, // trims whitespace if your user types something like " alex@123.com " into "alex@123.com"
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
    },
    image: { type: String },
    googleId: { type: String },
    isAdmin: { type: Boolean, default: false },
    isVendor: { type: Boolean, default: false },
    vendorType: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

//CREATE USER STATIC
userSchema.statics.createUser = async function (req) {
  let { name, email, password } = req.body;


    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );
  
  
    const user = await this.create({
      name,
      email,
      password: hashedPassword,
    });
  
    return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });




};

//LOGIN USER STATIC
userSchema.statics.loginUser = async function (req) {
  let { email, password } = req.body;
  let user = await this.findOne({ email });
  if (!(await bcrypt.compare(password, user.password)))
    throw new Error("Invalid password");
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
};

// GET ALL VENDORS
userSchema.statics.getVendors = async function () {
  return await this.find({ isVendor: true });
};



module.exports = mongoose.model("User", userSchema);
