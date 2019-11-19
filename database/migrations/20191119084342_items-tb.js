exports.up = function(knex) {
	return knex.schema.createTable('items', tb => {
		tb.increments();

		tb.string('title', 255).notNullable();
		tb.string('description', 255);
		tb.string('link', 255);
		tb.date('deadline');
		tb.boolean('completed')
			.notNullable()
			.defaultTo(false);
		tb.integer('bucketlist_id')
			.unsigned()
			.references('id')
			.inTable('bucketlists')
			.notNullable();
		tb.timestamps(true, true);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('items');
};
