exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('todolist').del(),
    knex('categories').del(),
    knex('users').del()
  ]);
};
