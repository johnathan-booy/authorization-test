require("dotenv").config()
const cors = require("cors")
const express = require("express")
const authRoutes = require("./routes/auth-routes")
const userRoutes = require("./routes/user-routes")
const passport = require("./services/passport-service")
const session = require("express-session")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

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

app.listen(port, () => {
  console.log(`app listening on port ${port}!`)
})
