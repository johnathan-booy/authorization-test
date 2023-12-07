exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary()
    table.string("google_id")
    table.string("username")
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable("users")
}
