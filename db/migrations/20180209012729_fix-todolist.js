
exports.up = function(knex, Promise) {
  return knex.schema.table('categories', function (table) {
    table.primary('id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('categories', function (table) {
    table.dropPrimary('id');
  });
};
