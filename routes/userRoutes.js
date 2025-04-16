const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const usersFile = path.join(__dirname, "../data/users.json");

// Ensure users.json exists
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify([]));
}

// Get all users
router.get("/", (req, res, next) => {
  fs.readFile(usersFile, "utf8", (err, data) => {
    if (err) return next(err);
    res.json(JSON.parse(data));
  });
});

// Register a new user
router.post("/register", (req, res, next) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res
      .status(400)
      .json({ error: "Email, username, and password are required" });
  }

  fs.readFile(usersFile, "utf8", (err, data) => {
    if (err) return next(err);
    let users = JSON.parse(data);

    if (users.find((u) => u.email === email)) {
      return res.status(409).json({ error: "Email already registered" });
    }
    if (users.find((u) => u.username === username)) {
      return res.status(409).json({ error: "Username already taken" });
    }

    users.push({ email, username, password });
    fs.writeFile(usersFile, JSON.stringify(users, null, 2), (err) => {
      if (err) return next(err);
      // Set session user after registration
      req.session.user = { email, username };
      res.status(201).json({
        message: "User registered successfully",
        token: "dummy-token", // Replace with real token logic later
        username,
      });
    });
  });
});

// Login route
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  fs.readFile(usersFile, "utf8", (err, data) => {
    if (err) return next(err);
    let users = JSON.parse(data);

    const user = users.find(
      (u) =>
        (u.email === email || u.username === email) && u.password === password
    );

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
        redirect: "/register",
      });
    }

    // Set session user after login
    req.session.user = { email: user.email, username: user.username };
    res.json({
      message: "Login successful",
      token: "dummy-token",
      username: user.username,
    }); // You can implement JWT later
  });
});

module.exports = router;
