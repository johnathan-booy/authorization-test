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
      try {
        let user = await User.findByGoogleId(profile.id)

        if (!user) {
          // Create new user if not found
          user = await User.create({
            google_id: profile.id,
            username: profile.displayName
          })
          console.log("New user created: " + JSON.stringify(user))
        } else {
          console.log("Existing user: " + JSON.stringify(user))
        }

        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
)
