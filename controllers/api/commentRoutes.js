const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {      
      const commentData = await Comment.findAll({});  
      // Serialize data so the template can read it
      const comments = commentData.map((comment) => comment.get({ plain: true }));  
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/', withAuth, async (req, res) => {
    try {
        const createComment =  await Comment.create(
            {
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,            
                user_id: req.session.user_id,
            }
        );
        res.status(200).json(createComment);
    } catch (err) {
            console.log(err.message);
            res.status(500).json(err);
        }
    });

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteComment =  await Comment.destroy({
            where: {
                id: req.params.id
              },
        });
        if (!deleteComment) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        };
        res.status(200).json(createComment);
    } catch (err) {
            console.log(err.message);
            res.status(500).json(err);
        }
}); 

module.exports = router;