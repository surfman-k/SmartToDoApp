
exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', function (table) {
    table.integer('id');
    table.string('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('categories', function (table) {
    table.dropColumn('id');
    table.dropColumn ('name');
  });
};
