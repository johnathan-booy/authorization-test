exports.up = function (knex) {
  return knex.schema.table("users", (table) => {
    table.string("email").unique()
  })
}

exports.down = function (knex) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("email")
  })
}
