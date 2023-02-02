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