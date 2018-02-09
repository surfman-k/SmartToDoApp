
exports.up = function(knex, Promise) {
    return knex.schema.table('todolist', function (table) {
    table.string('comment');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('todoilst', function (table) {
    table.dropColumn('comment');
  });
};
