const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Register a new user
router.post("/register", async (req, res, next) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res
      .status(400)
      .json({ error: "Email, username, and password are required" });
  }
  try {
    if (await User.findOne({ email })) {
      return res.status(409).json({ error: "Email already registered" });
    }
    if (await User.findOne({ username })) {
      return res.status(409).json({ error: "Username already taken" });
    }
    const user = new User({ email, username, password });
    await user.save();
    req.session.user = { email, username };
    res.status(201).json({
      message: "User registered successfully",
      token: "dummy-token",
      username,
    });
  } catch (err) {
    next(err);
  }
});

// Login route
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    const user = await User.findOne({
      $or: [{ email }, { username: email }],
      password,
    });
    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
        redirect: "/register",
      });
    }
    req.session.user = { email: user.email, username: user.username };
    res.json({
      message: "Login successful",
      token: "dummy-token",
      username: user.username,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
