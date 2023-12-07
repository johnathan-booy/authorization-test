const router = require("express").Router()
const authCheck = require("../middleware/authCheck")

router.get("/", (req, res) => {
  if (req.user) {
    res.json({
      user: req.user
    })
  } else {
    res.status(401).json({
      message: "Not authenticated"
    })
  }
})

module.exports = router
