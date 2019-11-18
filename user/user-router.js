const Users = require('./user-model');

const router = require('express').Router();

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  Users.findById(userId).then(user => {
    const data = {displayname: user.displayname}
    res.status(200).json(data)
  }).catch(error =>
      res.status(500).json({"message": "Error fetching user"})
  )
});

module.exports = router;

