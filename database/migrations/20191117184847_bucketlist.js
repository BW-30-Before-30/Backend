exports.up = function(knex) {
    return knex.schema.createTable('bucketlists', bucketlists => {
        bucketlists.increments();
        bucketlists.boolean('public').notNullable().defaultTo(false);
        bucketlists
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .notNullable()
            .unique();
        bucketlists.timestamps(true, true);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('bucketlists');
  };

  
