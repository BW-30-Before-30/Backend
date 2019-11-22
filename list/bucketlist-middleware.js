const Bucketlist = require('./bucketlist-model');

const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = {
    setUserId,
    getBucketList
};

function setUserId(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: 'Could not authenticate' });
        } else {
          req.params.userId = decodedToken.id;
          next();
        }
      })
    } else {
      next();
    }
  }
  
  function getBucketList(req, res, next) {
      console.log(req.params)
    const listId = req.params.id;
    Bucketlist.findById(listId).then(bucketlist => {
      if (bucketlist.public) {
          req.params.bucketlist = bucketlist;
          next();
        } else if (req.params.userId !== bucketlist.user_id) {
          res.status(401).json({ message: "You are not allowed to look at the list" });
        } else {
          req.params.bucketlist = bucketlist;
          next();
        }
      }).catch(error =>{
          console.log(error);
        res.status(500).json({ message: "Error" });
      })
  }