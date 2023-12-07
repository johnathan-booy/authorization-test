require("dotenv").config()
const express = require("express")
const authRoutes = require("./routes/auth-routes")
const profileRoutes = require("./routes/profile-routes")
const passportSetup = require("./config/passport-setup")
const passport = require("passport")
const session = require("express-session")

const app = express()

app.use(
  session({
    secret: process.env.SESSION_SECRET, // Set this in your .env file
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.set("view engine", "ejs")

// set up routes
app.use("/auth", authRoutes)
app.use("/profile", profileRoutes)

// create home route
app.get("/", (req, res) => {
  console.log("req.user: " + JSON.stringify(req.user))
  res.render("home", { user: req.user })
})

app.listen(3000, () => {
  console.log("app listening on port 3000!")
})
