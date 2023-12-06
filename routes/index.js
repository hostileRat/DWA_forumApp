module.exports = function () {
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/topics", function (req, res) {
    db.query(sqlQuery, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect("/");
      }

      console.log(result);

      let dataToSend = Object.assign({}, data, {
        topics: result,
      });

      res.render("topics", dataToSend);
    });
  });
};
