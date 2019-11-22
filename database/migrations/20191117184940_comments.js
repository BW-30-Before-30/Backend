exports.up = function(knex) {
    return knex.schema.createTable('comments', comments => {
        comments.increments();
        comments.string('text', 255).notNullable();
        comments
            .integer('item_id')
            .unsigned()
            .references('id')
            .inTable('items')
            .notNullable();
          comments
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .notNullable();
          comments.timestamps(true, true);            
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('comments');
  };

  
