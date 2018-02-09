exports.seed = function(knex, Promise) {
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        knex('categories').insert({id: 1, name: 'movie'}),
        knex('categories').insert({id: 2, name: 'book'}),
        knex('categories').insert({id: 3, name: 'rest'}),
        knex('categories').insert({id: 4, name: 'prod'})
      ]);
    });
};
