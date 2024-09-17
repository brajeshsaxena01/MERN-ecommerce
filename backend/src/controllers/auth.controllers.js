const jwt = require("jsonwebtoken");
const User = require("../models/user.models");
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY);
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    //check email
    if (user) {
      return res.status(400).send({ message: "Email already exists." });
    }

    // if new user, create it or allow to register
    user = await User.create(req.body);
    const token = generateToken(user);
    // return res.status(201).send({ user, token });
    return res
      .cookie("jwt", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      })
      .status(200)
      .send({
        id: user.id,
        addresses: user.addresses,
        email: user.email,
        role: user.role,
      });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const login = async (req, res) => {
  //   console.log("Cookies: ", req.cookies);
  try {
    const user = await User.findOne({ email: req.body.email });
    //Check if email exists
    if (!user) {
      return res.status(400).send({ message: "Wrong email or password!" });
    }
    // if email exists, check password
    // checkPassword method is create in userSchema
    const match = user.checkPassword(req.body.password); // return true of false
    //if it doesn't match
    if (!match) {
      return res.status(400).send({ message: "Wrong email or password!" });
    }

    // if it matches
    const token = generateToken(user);

    // Note: the token generated during resistration and login of the same user will be different. line 19 and 42
    return res
      .cookie("jwt", token, {
        expires: new Date(Date.now() + 3600000), // the token will be removed from cookies in 1hr hence token verification will be failed
        httpOnly: true,
      })
      .status(200)
      .send({
        id: user.id,
        addresses: user.addresses,
        email: user.email,
        role: user.role,
      });
    // return res.status(200).send({ user, token });
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({ message: error.message });
  }
};

// Clear the cookie in Node.js
const logout = async (req, res) => {
  try {
    // Setting the cookie with the same name and an expiration date in the past
    res.clearCookie("jwt", {
      httpOnly: true, // If you set the cookie with httpOnly: true, you need to keep it
      secure: process.env.NODE_ENV === "production", // Set to true if in production (HTTPS)
      sameSite: "strict",
    });
    return res.status(200).send("Cookie cleared");
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

module.exports = { register, login, logout };
