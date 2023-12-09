const router = require("express").Router()
const authCheck = require("../middleware/authCheck")
const User = require("../models/user")

router.get("/", authCheck, (req, res) => {
  res.json({
    user: req.user
  })
})

router.post("/", async (req, res, next) => {
  try {
    console.log("New user signup attempt: " + JSON.stringify(req.body))
    const { username, email } = req.body

    if (!username || !email) {
      return res.status(400).json({ message: "Missing required data." })
    }

    const existingUser = await User.getUserByEmail(email)
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." })
    }

    const newUser = await User.create({ username, email })

    req.login(newUser, (err) => {
      if (err) {
        return next(err)
      }
      return res.json({ message: "User created successfully.", user: newUser })
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
