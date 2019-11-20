const Bucketlist = require('./lists-model');
const Middleware = require('./lists-middleware');
const Items = require('../items/items-model');

const router = require('express').Router();

router.get('/', Middleware.setUserId, (req, res) => {
	const userId = req.params.userId;

	Bucketlist.findBy({ user_id: userId })
		.first()
		.then(bucketlist => {
			res.status(200).json(bucketlist);
		})
		.catch(error => {
			res.status(500).json({ message: 'error fetching bucketlist' });
		});
});

router.get(
	'/:id',
	Middleware.setUserId,
	Middleware.getBucketList,
	(req, res) => {
		const bucketlist = req.params.bucketlist;
		Items.findByListId(bucketlist.id)
			.then(items => {
				res.status(200).json(items);
			})
			.catch(error => {
				res.status(500).json({ message: 'error fetching bucketlist items' });
			});
	}
);

router.put(
	'/:id',
	Middleware.setUserId,
	Middleware.getBucketList,
	(req, res) => {
		const bucketlist = req.params.bucketlist;
		const { publicAcc } = req.body;
		if (req.params.userId === bucketlist.user_id) {
			Bucketlist.update(bucketlist.id, { publicAcc: publicAcc })
				.then(id => res.status(200).json({ id }))
				.catch(error =>
					res.status(500).json({ message: 'coult not update list' })
				);
		} else {
			res.status(401).json({ message: 'You are not authorized!' });
		}
	}
);

module.exports = router;
