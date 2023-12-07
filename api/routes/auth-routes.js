const router = require("express").Router()
const passport = require("passport")

// auth logout
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.json({ message: "Successfully logged out." })
  })
})

// auth with google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }))

// callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("http://localhost:5173/profile")
})

module.exports = router
