const knex = require("../db/db")

class User {
  static findAll() {
    return knex("users").select("*")
  }

  static async findById(id) {
    const result = await knex("users").select("*").where({ id: id })
    return result[0] || null
  }

  static async findByGoogleId(googleId) {
    const result = await knex("users").select("*").where({ google_id: googleId })
    return result[0] || null
  }

  static async create(newUser) {
    const result = await knex("users").insert(newUser).returning("*")
    return result[0] || null
  }
}

module.exports = User
