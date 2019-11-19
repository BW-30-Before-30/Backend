const Users = require('./users-model');

const router = require('express').Router();
const restricted = require('../auth/auth-middleware');

router.get('/', restricted, (req, res) => {
	Users.find()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => res.send(err));
});

router.get('/:id', (req, res) => {
	const userId = req.params.id;
	Users.findById(userId)
		.then(user => {
			const data = { displayname: user.displayname };
			res.status(200).json(data);
		})
		.catch(error => res.status(500).json({ message: 'Error fetching user' }));
});

module.exports = router;
