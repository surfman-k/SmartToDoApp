exports.seed = function(knex, Promise) {
  return knex('users')
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Alice'}),
        knex('users').insert({id: 2, name: 'Bob'}),
        knex('users').insert({id: 3, name: 'Charlie'}),
        knex('users').insert({id: 4, name: 'Josh'}),
      ]);
    });
};
