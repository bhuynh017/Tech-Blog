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