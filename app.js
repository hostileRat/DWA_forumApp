const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

// Define the database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "Logic1970",
  password: "Castle2.Joy",
  database: "myForumApp",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});
global.db = db; // Making the database connection available globally

// Set up css
app.use(express.static(__dirname + "/public")); // Serving static files from the "public" directory

// Set the directory where Express will pick up HTML files
// __dirname will get the current directory
app.set("views", __dirname + "/views");

// Tell Express that we want to use EJS as the templating engine
app.set("view engine", "ejs");

// Tells Express how we should process html files
app.engine("html", ejs.renderFile);

let data = {};

require("./routes/index")(app, data);

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
