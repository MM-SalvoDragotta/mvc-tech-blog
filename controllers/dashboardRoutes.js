const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const postData = await Post.findAll({
        where: {
            // use the ID from the session
            user_id: req.session.user_id
          },
        attributes: [
          'id',
          'title',
          'created_at',
          'content'
        ],
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['name']
            }
          },
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('dashboard', { 
        posts, 
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
});
  
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
      // Get One Project
      const postData = await Post.findOne({
      where: {
          // use the ID from the session
          id: req.params.id
          },
      attributes: [
          'id',
          'title',
          'created_at',
          'content'
      ],
      include: [
          {
            model: User,
            attributes: ['name'],
            },
            {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['name']
              }
            },
          ],
        });

    // Serialize data so the template can read it
    const onePost = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('edit-post', { 
    onePost, 
    logged_in: true
    });
  } catch (err) {
      res.status(500).json(err);
  }
});  

router.get('/create', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      where: {
          // use the ID from the session
          user_id: req.session.user_id
        },
      attributes: [
        'id',
        'title',
        'created_at',
        'content'
      ],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['name']
          }
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('createpost', { 
      posts, 
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;