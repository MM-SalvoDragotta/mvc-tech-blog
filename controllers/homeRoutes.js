const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
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
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});
  
router.get('/post/:id', withAuth,  async (req, res) => {
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
          // res.status(200).json(getPost);

           // serialize the data
          const post = getPost.get({ plain: true });
  
        // pass data to template
        res.render('editpost', {
            post,
            loggedIn: req.session.loggedIn
          })      
  } catch (err) {
          console.log(err.message);
          res.status(500).json(err);
      }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('login');
});

module.exports = router;
