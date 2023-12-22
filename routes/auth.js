const express = require("express");
const session = require("express-session");
const router = express.Router();
const bcrypt = require("bcrypt");

let x = hashPassword("password1");

function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    // If the user is authenticated, proceed to the next middleware or route handler
    return next();
  } else {
    // If the user is not authenticated, redirect to the login page
    res.redirect("./auth/login");
  }
}

// Login route
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        return;
      }

      if (results.length > 0) {
        const user = results[0];

        // Check the password using bcrypt
        const passwordMatch = await checkPassword(password, user.password_hash);
        console.log(passwordMatch);

        if (passwordMatch) {
          // Set the user in the session
          req.session.user = user;
          res.render("home.ejs", { user: req.session.user });
        } else {
          res.send("Invalid credentials. Please try again.");
        }
      } else {
        res.send("Invalid credentials. Please try again.");
      }
    }
  );
});

// Logout route
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// Display login form
router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    // Save the user to the database with the hashed password
    db.query(
      "INSERT INTO users (username, password_hash) VALUES (?, ?)",
      [username, hashedPassword],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send("Internal Server Error");
          return;
        }

        res.send("User registered successfully.");
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/register", (req, res) => {
  res.render("register.ejs");
});

// Hash the user's password before saving it to the database
function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// Check the provided password against the hashed password in the database
async function checkPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = router;
