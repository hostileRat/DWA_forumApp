const express = require("express");
const router = express.Router();

// Handle authentication routes
const auth = require("./auth.js");
router.use("/auth", auth);

router.get("/", (req, res) => {
  res.render("home.ejs");
});

router.get("/about", (req, res) => {
  res.render("about.ejs");
});

router.get("/topics", (req, res) => {
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    }

    console.log(result);

    let topics = result;

    res.render("topics.ejs", { topics });
  });
});

router.get("/users", (req, res) => {
  res.render("users.ejs");
});

router.get("/search", (req, res) => {
  res.render("search.ejs");
});

router.get("/posts", (req, res) => {
  let query =
    "SELECT posts.*, topics.topic_name, users.username FROM posts JOIN topics ON posts.topic_id = topics.topic_id JOIN users ON posts.user_id = users.user_id;";

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.redirect("./");
    }

    console.log(result);

    let posts = result;

    res.render("posts.ejs", { posts });
  });
});
router.get("/add-post", (req, res) => {
  let topicsQuery = "SELECT topic_id, topic_name FROM topics";
  let usersQuery = "SELECT user_id, username FROM users";

  // Use Promise.all to execute both queries simultaneously
  Promise.all([
    new Promise((resolve, reject) => {
      db.query(topicsQuery, (err, topicsResult) => {
        if (err) {
          reject(err);
        } else {
          resolve(topicsResult);
        }
      });
    }),
    new Promise((resolve, reject) => {
      db.query(usersQuery, (err, usersResult) => {
        if (err) {
          reject(err);
        } else {
          resolve(usersResult);
        }
      });
    }),
  ])
    .then(([topicsResult, usersResult]) => {
      let topics = topicsResult;
      let users = usersResult;

      res.render("add-post.ejs", { topics, users });
    })
    .catch((err) => {
      console.error(err);
      res.redirect("./");
    });
});

router.post("/added", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const topicId = req.body.topic;
  const userId = req.body.user;

  // Insert the new post into the database
  const insertQuery =
    "INSERT INTO posts (user_id, title, content, topic_id) VALUES (?,?, ?, ?)";
  const values = [userId, title, content, topicId];

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error("Error inserting post:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    console.log("New post added with ID:", result.insertId);

    // Redirect to the posts page or display a confirmation
    res.redirect("/posts");
  });
});

module.exports = router;
