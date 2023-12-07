const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20")
const User = require("../models/user")

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)

  if (user) {
    done(null, user)
  }
})

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      const currentUser = await User.findByGoogleId(profile.id)
      console.log("currentUser: " + JSON.stringify(currentUser))
      done(null, currentUser)

      // create new user in our db
      if (!currentUser) {
        const newUser = await User.create({
          google_id: profile.id,
          username: profile.displayName
        })
        console.log("newUser: " + JSON.stringify(newUser))
        done(null, newUser)
      }
    }
  )
)
