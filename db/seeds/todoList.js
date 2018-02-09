exports.seed = function(knex, Promise) {
  return knex('todolist').del()
    .then(function () {
      return Promise.all([
        knex('todolist').insert({name: 'Poop', user: 1, category: 1, createdOn: '01-01-2017', completeBy: '02-02-2017', comment: 'POOOOOOP' }),
        knex('todolist').insert({name: 'Everybody Poops', user: 2, category: 2, createdOn: '09-12-2017', completeBy: '11-12-2017', comment: 'My Fave Book!' }),
        // knex('todoList').insert({name: 'Poop', category: 'movie', createdOn: '23-12-17', completeBy: '25-12-17', comment: 'POOOOOOP' }),
        // knex('todoList').insert({name: 'Poop', category: 'movie', createdOn: '23-12-17', completeBy: '25-12-17', comment: 'POOOOOOP' }),
      ]);
    });
};
