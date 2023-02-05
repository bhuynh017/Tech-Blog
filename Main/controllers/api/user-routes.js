const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    // creating a new user in the database
    const userData = await User.create({
        // then the data is passed in the request
        username: req.body.username,
        password: req.body.password,
    });

    // if the user is created successfully then it is saved in the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      // Returning status of 200 meaning its okay.
      res.status(200).json(userData);
    });
  } catch (err) {
    // or returns an error status of 400
    res.status(400).json(err);
  }
});

// adding post route for user login.
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    // returning error if user not found.
    if (!user) {
      res.status(400).json({ message: 'User was not found!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    // returning error if password did not match then returning message.
    if (!validPassword) {
      res.status(400).json({ message: 'User was not found!' });
      return;
    }

    // saving session and username and allowing user to be loggedIn.
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      // informing user that they are logged in.
      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    // if failed then no user was found.
    res.status(400).json({ message: 'User account was not found.' });
  }
});

// post route to log user out and destroy session.
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
