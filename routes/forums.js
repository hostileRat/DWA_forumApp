const express = require("express");
const router = express.Router();

// Define forum-related routes

router.get("/", (req, res) => {
  res.send("Welcome to the Forums!");
});

router.get("/:forumId", (req, res) => {
  const forumId = req.params.forumId;
  res.send(`Viewing forum ${forumId}`);
});

module.exports = router;
