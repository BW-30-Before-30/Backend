exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {id: 1, text: 'You are loco!', item_id: 3, user_id: 1}
      ]);
    });

};