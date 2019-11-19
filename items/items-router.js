const router = require('express').Router();
const Middleware = require('../bucketlists/lists-middleware');
const Bucketlist = require('../bucketlists/lists-model');
const Items = require('../items/items-model');

router.get(
	'/:id/items/:item_id',
	Middleware.setUserId,
	Middleware.getBucketList,
	getItem,
	getComments,
	(req, res) => {
		const item = req.params.item;
		item.comments = req.params.comments || [];
		res.status(200).json(item);
	}
);

router.put(
	'/:id/items/:item_id',
	Middleware.setUserId,
	Middleware.getBucketList,
	getItemPrivate,
	(req, res) => {
		const item = req.body;
		item.id = req.params.item_id;
		item.bucketlist_id = req.params.id;
		Items.update(item).then(item => {
			res.status(200).json(item);
		});
	}
);

router.post(
	'/:id/items',
	Middleware.setUserId,
	Middleware.getBucketList,
	(req, res) => {
		const item = req.body;
		const bucketlist = req.params.bucketlist;
		item.bucketlist_id = bucketlist.id;
		Items.add(item)
			.then(item => res.status(200).json(item))
			.catch(error => {
				console.log(error);
				res.status(500).json({ message: 'Error saving item' });
			});
	}
);

router.delete(
	'/:id/items/:item_id',
	Middleware.setUserId,
	Middleware.getBucketList,
	getItemPrivate,
	(req, res) => {
		const itemId = req.params.item.id;
		Items.remove(itemId)
			.then(ids => res.status(200).json({ ids }))
			.catch(error => {
				console.log(error);
				res.status(500).json({ message: 'Error deleting item' });
			});
	}
);

function getItem(req, res, next) {
	console.log(req.params);
	const itemId = req.params.item_id;
	const bucketlist = req.params.bucketlist;
	if (bucketlist.public) {
		Items.findById(itemId)
			.then(item => {
				req.params.item = item;
				next();
			})
			.catch(error => {
				res.status(500).json({ message: 'Error getting item' });
			});
	} else if (req.params.userId !== bucketlist.user_id) {
		res
			.status(401)
			.json({ message: 'You are not allowed to look at the list' });
	} else {
		Items.findById(itemId)
			.then(item => {
				req.params.item = item;
				next();
			})
			.catch(error => {
				res.status(500).json({ message: 'Error getting item' });
			});
	}
}

function getComments(req, res, next) {
	if (req.params.item) {
		Comments.findBy({ item_id: req.params.item.id })
			.then(comments => {
				req.params.comments = comments;
				next();
			})
			.catch(error => {
				res.status(500).json({ message: 'Error fetching comments' });
			});
	} else {
		next();
	}
}

function getItemPrivate(req, res, next) {
	const itemId = req.params.item_id;
	const bucketlist = req.params.bucketlist;
	if (req.params.userId !== bucketlist.user_id) {
		res
			.status(401)
			.json({ message: 'You are not allowed to look at the list' });
	} else {
		Items.findById(itemId)
			.then(item => {
				req.params.item = item;
				next();
			})
			.catch(error => {
				res.status(500).json({ message: 'Error getting item' });
			});
	}
}
module.exports = router;
