
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', function(table) {
    table.unique('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', function(table) {
    table.dropUnique('name');
  });
};
