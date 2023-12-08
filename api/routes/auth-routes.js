const router = require("express").Router()
const passport = require("passport")
const User = require("../models/user")
const MailService = require("../services/mail-service")

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

// auth with linkedin
router.get("/linkedin", passport.authenticate("linkedin"))

// callback route for linkedin to redirect to
router.get(
  "/linkedin/redirect",
  passport.authenticate("linkedin", {
    successRedirect: "http://localhost:5173/profile",
    failureRedirect: "http://localhost:5173/auth/login"
  })
)

router.post("/magic-link/send", async function (req, res) {
  const userEmail = req.body?.email?.toLowerCase()

  if (userEmail) {
    const user = await User.getUserByEmail(userEmail)

    if (user) {
      await MailService.sendMagicAuthEmail(user)
    }
  }

  res.json({
    message: "If this email is associated with a Jobtest.org account, you will receive a magic signin link shortly."
  })
})

module.exports = router
