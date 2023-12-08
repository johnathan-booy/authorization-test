exports.up = function (knex) {
  return knex.schema.table("users", (table) => {
    table.string("linkedin_id")
  })
}

exports.down = function (knex) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("linkedin_id")
  })
}
