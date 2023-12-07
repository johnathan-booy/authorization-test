require("dotenv").config()
const cors = require("cors")
const express = require("express")
const authRoutes = require("./routes/auth-routes")
const userRoutes = require("./routes/user-routes")
const passportSetup = require("./config/passport-setup")
const passport = require("passport")
const session = require("express-session")

const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
)

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
  })
)

app.use(passport.initialize())
app.use(passport.session())

// set up routes
app.use("/auth", authRoutes)
app.use("/user", userRoutes)

app.listen(3000, () => {
  console.log("app listening on port 3000!")
})
