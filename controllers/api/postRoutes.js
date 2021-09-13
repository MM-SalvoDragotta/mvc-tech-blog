
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/create', withAuth, async (req, res) => {
    try {
        const createPost =  await Post.create(
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

router.get('/:id', withAuth, async (req, res) => {
    try {
        const getPost =  await Post.findOne({
            where: {
              id: req.params.id
            },
            attributes: [
              'id',
              'title',
              'created_at',
              'content'
            ],
            include: [
              // include the Comment model here:
              {
                model: User,
                attributes: ['name']
              },
              {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['name']
                }
              }
            ]
            });
            if (!getPost) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
            }
            res.status(200).json(getPost);
    } catch (err) {
            console.log(err.message);
            res.status(500).json(err);
        }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const getPost =  await Post.update(
            {
                ...req.body,
                // user_id: req.session.user_id,
            },
            {
                where: {
                  id: req.params.id
                }
              }
        );
        if (!getPost) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
            }
        res.status(200).json(getPost);
    } catch (err) {
            console.log(err.message);
            res.status(500).json(err);
        }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const getPost = await Post.destroy(
            {
                where: {
                  id: req.params.id
                }
            }
        );
        if (!getPost) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
            }
        res.status(200).json(getPost);
    } catch (err) {
            console.log(err.message);
            res.status(500).json(err);
        }
});

router.get('/', withAuth, async (req, res) => {
  try {
      const getPosts =  await Post.findAll({      
          attributes: [
            'id',
            'title',
            'created_at',
            'content'
          ],
          order: [['created_at', 'DESC']],
          include: [
            // include the Comment model here:
            {
              model: User,
              attributes: ['name']
            },
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
              include: {
                model: User,
                attributes: ['name']
              }
            }
          ]
          });   
          res.status(200).json(getPosts);
  } catch (err) {
          console.log(err.message);
          res.status(500).json(err);
      }
});


module.exports = router;