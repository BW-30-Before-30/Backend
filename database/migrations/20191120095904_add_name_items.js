exports.up = function(knex) {
	return knex.schema.table('items', tb => {
		tb.string('title', 255);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.table('items', function(t) {
		t.dropColumn('title');
	});
};
