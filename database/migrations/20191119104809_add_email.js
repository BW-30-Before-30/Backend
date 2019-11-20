exports.up = function(knex) {
	return knex.schema.table('users', tb => {
		tb.string('email', 255);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.table('users', function(t) {
		t.dropColumn('email');
	});
};
