const express = require("express");
const router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    // If the user is authenticated, proceed to the next middleware or route handler
    console.log(req.session.user);
    return next();
  } else {
    // If the user is not authenticated, redirect to the login page
    res.redirect("/auth/login");
  }
}
// Handle authentication routes
const auth = require("./auth.js");
router.use("/auth", auth);

router.get("/", (req, res) => {
  res.render("home.ejs", { user: req.session.user });
});

router.get("/about", (req, res) => {
  res.render("about.ejs");
});

router.get("/topics", (req, res) => {
  const query = "SELECT * FROM topics;";

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
  const query = "SELECT * FROM users;";

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    }

    console.log(result);

    let users = result;

    res.render("users.ejs", { users });
  });
});

router.get("/search", (req, res) => {
  res.render("search.ejs");
});

router.get("/search-result", async (req, res) => {
  const keywords = req.query.keywords;
  const query =
    "SELECT posts.*, topics.topic_name, users.username FROM posts JOIN topics ON posts.topic_id = topics.topic_id JOIN users ON posts.user_id = users.user_id WHERE title LIKE ? OR content LIKE ?";
  db.query(query, [`%${keywords}%`, `%${keywords}%`], (err, result) => {
    if (err) {
      console.log(err);
      res.redirect("./");
    }

    console.log(result);

    let results = result;

    res.render("search-results.ejs", { results, keywords });
  });
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

router.get("/add-post", ensureAuthenticated, (req, res) => {
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
  const userId = req.session.user.user_id;
  console.log(userId);

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
