exports.seed = function(knex, Promise) {
  return knex('todoList').del()
    .then(function () {
      return Promise.all([
        knex('todoList').insert({name: 'Poop', category: '1', createdOn: '01-01-2017', completeBy: '02-02-2017', comment: 'POOOOOOP' }),
        // knex('todoList').insert({name: 'Poop', category: 'rest', createdOn: '23-12-17', completeBy: '25-12-17', comment: 'POOOOOOP' }),
        // knex('todoList').insert({name: 'Poop', category: 'movie', createdOn: '23-12-17', completeBy: '25-12-17', comment: 'POOOOOOP' }),
        // knex('todoList').insert({name: 'Poop', category: 'movie', createdOn: '23-12-17', completeBy: '25-12-17', comment: 'POOOOOOP' }),
      ]);
    });
};
