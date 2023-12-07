const router = require("express").Router()
const authCheck = require("../middleware/authCheck")

router.get("/", authCheck, (req, res) => {
  res.json({
    user: req.user
  })
})

module.exports = router
