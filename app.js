const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const ejs = require("ejs");
const mysql = require("mysql2");

// Initialise app
const app = express();
const port = 8000;

// Body parser middleware to handle POST request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Express session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: true,
    saveUninitialized: true,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "forum_app",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});
global.db = db; // Making the database connection available globally

// Set up basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Forum App!");
});

const authRoutes = require("./routes/auth");
const forumsRoutes = require("./routes/forums");
const threadsRoutes = require("./routes/threads");

// Use routes
app.use("/auth", authRoutes);
app.use("/forums", forumsRoutes);
app.use("/threads", threadsRoutes);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
