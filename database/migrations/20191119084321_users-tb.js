exports.up = function(knex) {
	return knex.schema.createTable('users', tb => {
		tb.increments();

		tb.string('username', 255)
			.notNullable()
			.unique();
		tb.string('password', 255).notNullable();
		tb.string('displayname', 255);
		tb.timestamps(true, true);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users');
};
