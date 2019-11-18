
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        // password: encrypted "pass"
        {id: 1, 
          username: "30", 
          password: '$2a$16$clL79OszKJ8SZnSDt41xQu.bqVg0yLmAFE1oVH/byBjFV1n0JiCXG',
          displayname: "Under 30"
        },
        {
          id: 2, 
          username: "25", 
          displayname: "Under 25",
          password: '$2a$16$clL79OszKJ8SZnSDt41xQu.bqVg0yLmAFE1oVH/byBjFV1n0JiCXG'
        }      
      ]);
    });
};
