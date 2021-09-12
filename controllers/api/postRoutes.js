
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const createPost =  Post.create(
            {
                ...req.body,
                user_id: req.session.user_id,
            }
        );

        res.status(200).json(createPost);
    } catch (err) {
            console.log(err.message);
            res.status(500).json(err);
        }
});

module.exports = router;