// boiler plate code
const router = require('express').Router();

// defining the three routes to user-routes, post-routes, and comment-routes.
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// the router maps the modules to a specific URL prefix. 
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;