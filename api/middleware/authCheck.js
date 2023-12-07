const authCheck = (req, res, next) => {
  if (!req.user) {
    // if user is not logged in
    res.redirect("/auth/login")
  } else {
    // if logged in
    next()
  }
}

module.exports = authCheck
