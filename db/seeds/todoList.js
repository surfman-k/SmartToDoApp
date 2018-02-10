exports.seed = function(knex, Promise) {
  return knex('todolist')
    .then(function () {
      return Promise.all([
        knex('todolist').insert({name: 'Poop', user: 1, category: 1, createdOn: '01-01-2017', completeBy: '02-02-2017', comment: 'POOOOOOP', checked: false }),
        knex('todolist').insert({name: 'Everybody Poops', user: 2, category: 2, createdOn: '09-12-2017', completeBy: '11-12-2017', comment: 'My Fave Book!', checked: false }),
        knex('todolist').insert({name: 'Mom and Pop sandwich shop', user: 3, category: 3, createdOn: '09-12-2017', completeBy: '11-12-2017', comment: 'Recommend by Jawsh!', checked: false }),
        knex('todolist').insert({name: 'Dyson hairdryer', user: 4, category: 4, createdOn: '09-12-2017', completeBy: '11-12-2017', comment: 'It\'s coo ', checked: false}),
        knex('todolist').insert({name: 'Narcos', user: 1, category: 1, createdOn: '06-06-2017', completeBy: '07-07-2017', comment: 'Always wanted to watch it', checked: true}),
        knex('todolist').insert({name: 'The Daily Show', user: 2, category: 1, createdOn: '10-02-2018', completeBy: '10-03-2018', comment: 'Recommended by Austin', checked: false }),
        knex('todolist').insert({name: 'The Rock', user: 3, category: 1, createdOn: '10-02-2018', completeBy: '10-04-2018', comment: 'Also recommended by Austin', checked: false }),
        knex('todolist').insert({name: 'Fifiteen Dogs', user: 4, category: 2, createdOn: '10-01-2018', completeBy: '03-01-2018', comment: 'Great book everyone should read', checked: true }),
      ]);
    });
};
