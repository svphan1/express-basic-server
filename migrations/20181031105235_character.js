
exports.up = function(knex, Promise) {
  // Code to run to set up our tables
  //create schema
  return knex.schema.createTable('character', function (table) {
    table.increments()
    table.string('name')
    table.integer('height')
    table.integer('mass')
  })
};

exports.down = function(knex, Promise) {
  // Code to run to remove tables & restart
  return knex.schema.dropTableIfExists('character')
};
