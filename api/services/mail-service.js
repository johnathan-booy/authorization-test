const AuthenticationService = require("./authentication-service")

module.exports = class MailService {
  static async sendMail(mail) {
    const formData = require("form-data")
    const Mailgun = require("mailgun.js")
    const mailgun = new Mailgun(formData)
    const mg = mailgun.client({ username: "api", key: process.env.MAILGUN_API_KEY })

    try {
      await mg.messages.create(process.env.MAILGUN_DOMAIN, mail)
      console.log("Email sent to " + mail.to)
    } catch (error) {
      console.error("Error sending mailgun email to " + mail.to)
      console.error(error)
    }
  }

  static async sendMagicAuthEmail(user) {
    const magicLink = this.generateMagicLink(user)

    const data = {
      from: "example@gmail.com",
      to: user.email,
      subject: "TEST Magic Signin Link",
      template: "magic-signin-link-2",
      "h:X-Mailgun-Variables": JSON.stringify({
        magic_link: magicLink,
        user_name: user.username
      })
    }

    await MailService.sendMail(data)
  }

  static generateMagicLink(user) {
    const token = AuthenticationService.generateJWT(user)
    return "http://localhost:5173/magic-link" + "?authKey=" + token
  }
}
