
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      return knex('items').insert([
        {id: 1, 
          name: 'skydive', 
          description: 'Skydive from 20K', 
          link: 'https://halojumper.com/', 
          deadline: '2020-10-10', 
          completed: false, 
          bucketlist_id: 1},
        {id: 2, 
          name: 'Tower of London', 
          description: 'See tower of london', 
          link: 'https://www.hrp.org.uk/tower-of-london/#gs.gqbgbm', 
          deadline: '2021-11-11', 
          completed: true, 
          bucketlist_id: 1},
        {id: 3, 
            name: 'Trip to Peru', 
            description: 'Visit Machu-Picchu', 
            link: 'https://www.travelchannel.com/destinations/peru/articles/what-you-should-know-about-visiting-machu-picchu', 
            deadline: '2019-11-28', 
            completed: false, 
          bucketlist_id: 2},    
      ]);
    });
};

