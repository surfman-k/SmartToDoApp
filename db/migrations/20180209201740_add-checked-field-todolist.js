
exports.up = function(knex, Promise) {
  return knex.schema.table('todolist', function (table) {
    table.boolean('checked');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('todolist', function (table) {
    table.dropColumn('checked');
  });
};
