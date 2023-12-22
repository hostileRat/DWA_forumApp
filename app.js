// This file contains the main server code for the forum application.

// Importing required modules
const express = require("express"); // Express.js framework for building web applications
const session = require("express-session"); // Express.js middleware for managing sessions
const app = express(); // Creating an instance of the Express.js application
const port = 8000; // Port number on which the server will run
const ejs = require("ejs"); // Templating engine for rendering dynamic HTML

// Setting the view engine to EJS
app.set("view engine", "ejs");

// Parsing request bodies
app.use(express.urlencoded({ extended: true }));

// Serving static files from the "public" directory
app.use(express.static("public"));

// MySQL Connection Setup
const mysql = require("mysql"); // MySQL database driver
const db = mysql.createConnection({
  host: "localhost", // MySQL server host
  user: "appuser2", // MySQL username
  password: "Gottagetdownonfriday2011!", // MySQL password
  database: "forumApp", // MySQL database name
});

// Connecting to the MySQL database
db.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL:", err);
  } else {
    console.log("MySQL connected");
  }
});

// Making the database connection available globally
global.db = db;

// Configuring session middleware
app.use(
  session({
    secret: "your-secret-key", // Secret key used to sign the session ID cookie
    resave: false,
    saveUninitialized: false,
  })
);

// Handling routes
const routes = require("./routes/main.js"); // Importing the main routes module
app.use("/", routes); // Mounting the main routes module at the root URL

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
