exports.up = function(knex, Promise) {
  return knex.schema.createTable('todolist', function (table) {
    table.increments('id');
    table.string('name');
    table.integer('user').unsigned();
    table.foreign('user').references('users.id');
    table.integer('category').unsigned();
    table.foreign('category').references('categories.id');
    table.date('createdOn');
    table.date('completeBy');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('todolist', function (table) {
    table.dropColumn('id');
    table.dropColumn ('name');
    table.dropColumn ('user');
    table.dropColumn ('category');
    table.dropColumn ('createdOn');
    table.dropColumn ('completeBy');
  });
};

//problems with rollback reversed migrations