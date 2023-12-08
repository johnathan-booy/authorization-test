const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy
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
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scope: ["profile"]
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

// NOTE FOR LUKA AND VANJA: LinkedIn on passport.js has not been updated on npm yet, since the LinkedIn API has been updated.
// We are using the latest version of passport-linkedin-oauth2 from GitHub.
// Refer to this issue:  https://github.com/auth0/passport-linkedin-oauth2/issues/102
passport.use(
  new LinkedInStrategy(
    {
      callbackURL: "http://localhost:3000/auth/linkedin/redirect",
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      scope: ["profile", "email", "openid"],
      passReqToCallback: true,
      state: true
    },
    function (req, accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      req.session.accessToken = accessToken
      process.nextTick(async function () {
        try {
          let user = await User.findByLinkedInId(profile.id)

          if (!user) {
            // Create new user if not found
            user = await User.create({
              linkedin_id: profile.id,
              username: profile.displayName
            })
            console.log("New user created: " + JSON.stringify(user))
          } else {
            console.log("Existing user: " + JSON.stringify(user))
          }

          return done(null, user)
        } catch (error) {
          return done(error)
        }
      })
    }
  )
)

module.exports = passport
