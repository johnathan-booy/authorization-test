const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy
const CustomStrategy = require("passport-custom").Strategy
const User = require("../models/user")
const AuthenticationService = require("../services/authentication-service")

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
      scope: ["profile"],
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        if (req.user) {
          const updatedUser = await User.linkGoogleAccount(req.user.id, profile.id)
          if (!updatedUser) {
            return done(null, false)
          }
          done(null, updatedUser)
        } else {
          let user = await User.findByGoogleId(profile.id)

          if (!user) {
            user = await User.create({
              google_id: profile.id,
              username: profile.displayName
            })
            console.log("New google user created: " + JSON.stringify(user))
          } else {
            console.log("Existing google user: " + JSON.stringify(user))
          }

          done(null, user)
        }
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
      process.nextTick(async function () {
        try {
          console.log("LinkedIn profile email: " + JSON.stringify(profile.email))
          if (req.user) {
            const updatedUser = await User.linkLinkedInAccount(req.user, profile.id, profile.email)
            if (!updatedUser) {
              return done(null, false)
            }
            return done(null, updatedUser)
          } else {
            let user = await User.findByLinkedInId(profile.id)

            if (!user) {
              user = await User.create({
                email: profile.email,
                linkedin_id: profile.id,
                username: profile.displayName
              })
              console.log("New LinkedIn user created: " + JSON.stringify(user))
            } else {
              console.log("Existing LinkedIn user: " + JSON.stringify(user))
            }

            return done(null, user)
          }
        } catch (error) {
          return done(error)
        }
      })
    }
  )
)

passport.use(
  "custom-magic-link",
  new CustomStrategy(async function (req, done) {
    const authKey = req.headers.authorization.split(" ")[1]

    if (!authKey) {
      console.warn("No authKey provided")
      return done(null, false)
    }

    // Verify JWT
    const payload = AuthenticationService.verifyToken(authKey)

    // if JWT is invalid or expired, we don't want to log the user in
    if (!payload) {
      console.warn("Invalid JWT")
      return done(null, false)
    }

    // if JWT is valid, we want to find the user and log them in
    const user = await User.findById(payload.id)

    if (!user) {
      console.warn("User not found")
      return done(null, false)
    }

    console.info("User logged in with magic link: " + user.id + " " + user.email)
    return done(null, user)
  })
)

module.exports = passport
