const router = require("express").Router();
const passport = require("passport");

// auth login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// auth logout
// auth logout
router.get("/logout", (req, res, next) => {
  req.logout(next);
  res.redirect("/");
});

// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  // res.send(req.user);
  res.redirect("/profile");
  //res.redirect('/projects');
});

// New route for tracking car
router.get("/vehicleInfo", (req, res) => {
  res.render("vehicleInfo", { user: req.user });
});

module.exports = router;
