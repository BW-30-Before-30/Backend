const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');
const Bucketlist = require('../bucketlists/lists-model');

const secrets = require('../secrets');

router.post('/register', (req, res) => {
	let user = req.body;
	if (user.username && user.password && user.email) {
		const hash = bcrypt.hashSync(user.password, 16);
		user.password = hash;
		Users.add(user)
			.then(newUser => {
				Bucketlist.create(newUser.id)
					.then(bucket => res.status(200).json(newUser))
					.catch(error => res.status(500).json({ error: 'cannot register' }));
			})
			.catch(error => {
				console.log(error);
				res.status(500).json(error);
			});
	} else {
		res.status(400).json({ message: 'Missing input' });
	}
});

router.post('/login', (req, res) => {
	const { username, password } = req.body;
	Users.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({ message: `log in as * ${user.username} *` });
			} else {
				res.status(401).json({ message: 'Invalid Credentials' });
			}
		})
		.catch(error => {
			console.log(error);
			res.status(500).json(error);
		});
});

function generateToken(user) {
	const payload = {
		id: user.id
	};
	const options = {
		expiresIn: '1d'
	};

	return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
