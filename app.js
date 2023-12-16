const express = require("express");
const session = require("express-session");
const app = express();
const port = 8000;
const ejs = require("ejs");
const passport = require("./passport-config.js");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// MySQL Connection Setup
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "appuser",
  password: "Gottagetdownonfriday2011!",
  database: "forumApp",
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL:", err);
  } else {
    console.log("MySQL connected");
  }
});

// Make accessible everywhere
global.db = db;

// Handle routes
const routes = require("./routes/main.js");
app.use("/", routes);

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
