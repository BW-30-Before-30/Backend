exports.up = function(knex) {
    return knex.schema.createTable('items', items => {
        items.increments();

        items.string('name', 255).notNullable();
        items.string('description', 255);
        items.string('link', 255);
        items.date('deadline');
        items.boolean('completed').notNullable().defaultTo(false);
        items
            .integer('bucketlist_id')
            .unsigned()
            .references('id')
            .inTable('bucketlists')
            .notNullable();
        items.timestamps(true, true);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('items');
  };

  
