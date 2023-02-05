const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth'); 

// creating get request.
// withAuth is ensuring that the request is authorized
router.get('/', withAuth, async (req, res) => {
    try {
        // when user is logged in the route retrieves all posts that belong to the user.
      const postData = await Post.findAll({
        where: {
          userId: req.session.userId,
        },
      });
  
      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render('all-posts-admin', {
        layout: 'dashboard',
        posts,
      });
      // if there is an error, redirect back to login page.
    } catch (err) {
      res.redirect('login');
    }
  });

  // handing another get reqeust. 
  router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
      layout: 'dashboard',
    });
  });
  
  router.get('/edit/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id);
  
      if (postData) {
        const post = postData.get({ plain: true });
  
        res.render('edit-post', {
          layout: 'dashboard',
          post,
        });
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.redirect('login');
    }
  });
  
  module.exports = router;
  