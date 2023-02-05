const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// Setting up single route. withAuth is ensuring user is authenticated before they can access the route.
router.post('/', withAuth, async (req, res) => {
    const body = req.body;

    // creating new post and passing it over an object.
    try {
      const newPost = await Post.create({ ...body, userId: req.session.userId });
      res.json(newPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.put('/:id', withAuth, async (req, res) => {
    try {
        // updating a post.
      const [affectedRows] = await Post.update(req.body, {
        // finds the post and id
        where: {
          id: req.params.id,
        },
      });
  
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // delete a post by using Post.destroy.
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const [affectedRows] = Post.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;