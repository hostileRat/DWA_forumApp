const express = require("express");
const session = require("express-session");
const app = express();
const port = 8000;
const ejs = require("ejs");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// MySQL Connection Setup
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "appuser2",
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

global.db = db;

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Handle routes
const routes = require("./routes/main.js");
app.use("/", routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
