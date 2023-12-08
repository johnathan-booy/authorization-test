const knex = require("../db/db")

class User {
  static findAll() {
    return knex("users").select("*")
  }

  static async findById(id) {
    if (!id) return null
    const result = await knex("users").select("*").where({ id: id })
    return result[0] || null
  }

  static async findByGoogleId(googleId) {
    if (!googleId) return null
    const result = await knex("users").select("*").where({ google_id: googleId })
    return result[0] || null
  }

  static async findByLinkedInId(linkedinId) {
    if (!linkedinId) return null
    const result = await knex("users").select("*").where({ linkedin_id: linkedinId })
    return result[0] || null
  }

  static async create(newUser) {
    if (!newUser) return null
    const result = await knex("users").insert(newUser).returning("*")
    return result[0] || null
  }

  static async linkGoogleAccount(userId, googleId) {
    if (!userId || !googleId) return null

    const existingGoogleUser = await this.findByGoogleId(googleId)
    if (existingGoogleUser) return null

    const result = await knex("users").where({ id: userId }).update({ google_id: googleId }).returning("*")
    return result[0] || null
  }

  static async linkLinkedInAccount(userId, linkedinId) {
    if (!userId || !linkedinId) return null

    const existingLinkedInUser = await this.findByLinkedInId(linkedinId)
    if (existingLinkedInUser) return null

    const result = await knex("users").where({ id: userId }).update({ linkedin_id: linkedinId }).returning("*")
    return result[0] || null
  }
}

module.exports = User
