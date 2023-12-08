const jwt = require("jsonwebtoken")

module.exports = class AuthenticationService {
  static jwt_secret = process.env.SESSION_SECRET

  static verifyToken(token) {
    try {
      const decodedPayload = jwt.verify(token, this.jwt_secret, { complete: true })
      return decodedPayload.payload
    } catch (error) {
      return null
    }
  }

  static generateJWT(user, duration = "24h") {
    const secret = this.jwt_secret
    // Validate duration to ensure that either env variable has valid token duration value or use the default
    const expiresIn = this.validateDuration(duration)
    const options = { expiresIn }
    const payload = { id: user.id }
    return jwt.sign(payload, secret, options)
  }

  static validateDuration(duration) {
    const defaultDuration = "24h"
    const isValidDuration = /^[0-9]+[smh]$/.test(duration)
    if (!isValidDuration) {
      console.warn(`Invalid token duration value: ${duration}. Using default duration: ${defaultDuration}.`)
      return defaultDuration
    }
    return duration
  }
}
