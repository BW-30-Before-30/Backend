exports.up = function(knex) {
	return knex.schema.createTable('bucketlists', tb => {
		tb.increments();
		tb.boolean('public')
			.notNullable()
			.defaultTo(false);
		tb.integer('user_id')
			.unsigned()
			.references('id')
			.inTable('users')
			.notNullable()
			.unique();
		tb.timestamps(true, true);
	});
};
exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('bucketlists');
};
