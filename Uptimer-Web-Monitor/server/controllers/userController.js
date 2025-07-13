const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { ...user._doc, authenticated: true },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      status: "success",
      token,
      user: { ...user._doc, authenticated: true },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

async function currentUser(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized",
      });
    }

    res.status(200).json({
      status: "success",
      user, // Include user data
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

async function isAuthorized(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ status: "fail", message: "Unauthorized: No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data to the request object
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ status: "fail", message: "Invalid token" });
  }
}

module.exports = { register, login, currentUser, isAuthorized };
