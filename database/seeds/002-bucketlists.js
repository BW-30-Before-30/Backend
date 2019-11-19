exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('bucketlists')
		.del()
		.then(function() {
			return knex('bucketlists').insert([
				{ id: 1, public: false, user_id: 1 },
				{ id: 2, public: true, user_id: 2 }
			]);
		});
};
