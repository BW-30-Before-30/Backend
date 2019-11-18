const router = require('express').Router();

const Comments = require('./comment-model');
const Middleware = require('../list/bucketlist-middleware');


router.get('/:id', (req, res) => {
    const commentId = req.params.id;
    Comments.findById(commentId).then(comment => {
      res.status(200).json(comment);
    })
});


router.delete('/:id', Middleware.setUserId, (req, res) => {
  const commentId = req.params.id;
  const userId = req.params.userId
    Comments.findById(commentId).then(comment => {
      if (comment.user_id === userId ) {
        Comments.remove(commentId).then(count =>
          res.status(200).json(count))
      } else {
        res.status(401).json({"message": "you are not the comment creator"});
      }
    }).catch(error => {
      console.log(error);
      res.status(500).json({"message": "Error deleting comment"})
    });
  
});

router.post('/', Middleware.setUserId, (req, res) => {
  const {text, item_id} = req.body;
  const userId = req.params.userId;
  const newComment = {text, item_id, user_id: userId};
  Comments.add(newComment).then(comment =>
    res.status(200).json(comment)
    ).catch(error => {
      console.log(error);
      res.status(500).json({"message": "Error creating comment"})
    });
});


module.exports = router;

