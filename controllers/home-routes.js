const router = require("express").Router();
const { Post, Comment, User } = require("../models/");

// defining a GET route to get posts from the homepage.
router.get("/", async (req, res) => {
  // this "try" is retrieving all posts from the db using the findAll method
  try {
    const postData = await Post.findAll({
      // including the user with the post
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("all-posts", { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// this is retrieving a single post.
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render("single-post", { post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
