const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const query = "SELECT * FROM users WHERE username = ?";
      db.query(query, [username], async (error, results) => {
        if (error) {
          return done(error);
        }

        if (results.length === 0) {
          return done(null, false, {
            message: "Incorrect username or password",
          });
        }

        const user = results[0];

        const passwordMatch = await bcrypt.compare(
          password,
          user.password_hash
        );

        if (passwordMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Incorrect username or password",
          });
        }
      });
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const query = "SELECT * FROM users WHERE id = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      return done(error);
    }

    const user = results[0];
    done(null, user);
  });
});

module.exports = passport;
