const Bucketlist = require('./bucketlist-model');
const Middleware = require('./bucketlist-middleware');
const Items = require('../item/items-model');


const router = require('express').Router();


// get list
// a. private must be authenticated
// b. public is available to everyoe
// c. returns the list of items
router.get('/:id', Middleware.setUserId, Middleware.getBucketList, (req, res) => {
  const bucketlist = req.params.bucketlist;
  Items.findByListId(bucketlist.id).then(items => {
      res.status(200).json(items);
    }).catch(error => {
      console.log(error);
      res.status(500).json({"message": "error fetching bucketlist items"});
    });
});

// always private 
router.get('/', Middleware.setUserId, (req, res) => {
  const userId = req.params.userId;
  Bucketlist.findBy({user_id: userId}).first()
  .then(bucketlist => {
    console.log('get bucket private - got the data')
      res.status(200).json(bucketlist);
    }).catch(error => {
      console.log(error);
      res.status(500).json({"message": "error fetching bucketlist"});
    });
});

// must be authenticated and the list sh
router.put('/:id', Middleware.setUserId, Middleware.getBucketList, (req, res) => {
  const bucketlist = req.params.bucketlist;
  const {public} = req.body;
  if (req.params.userId === bucketlist.user_id) {
    Bucketlist.update(bucketlist.id, {public: public})
    .then(id =>
      res.status(200).json({id})
    )
    .catch(error => res.status(500).json({"message": "coult not update list"}));
  } else {
    res.status(401).json({"message": "You are not authorized!"});
  }
});

module.exports = router;

