exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary()
    table.string("google_id")
    table.string("username")
    table.timestamp("created_at").defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable("users")
}
