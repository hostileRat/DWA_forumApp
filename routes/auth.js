const express = require("express");
const session = require("express-session");

const passport = require("../passport-config"); // Adjust the path based on your project structure

const router = express.Router();

// Display the login form
router.get("/login", (req, res) => {
  res.render("login.ejs");
});

// Handle login POST request
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/", // Redirect on successful login
    failureRedirect: "/login", // Redirect on failed login
    failureFlash: true, // Enable flash messages for failed login
  })
);

module.exports = router;
