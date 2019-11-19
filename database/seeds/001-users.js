exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('users')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('users').insert([
				{
					id: 1,
					username: 'test',
					password:
						'$2a$16$jaB7FFSN6RFD/pHB1y8O7ufEzBy2nG162Ogrbo1YdP8imjYrLKuDS',
					displayname: 'test'
				},
				{
					id: 2,
					username: 'admin',
					displayname: 'admin',
					password:
						'$2a$16$kEfwcsMxA7vrTeGXZ9MlWuxV/ePU5D1b1CWdLK.ehetSy1H.R1y3C'
				}
			]);
		});
};
