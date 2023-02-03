// creating these lines of code to be able to utilize other code from JavaScript files located in the models folder.
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// This is important to add in the index.js due to it fetching data from the db.
// The belongsTo method is creating a relationship where Post is associated with a user.
Post.belongsTo(User, {
    foreignKey: 'userId',
    // if the user is deleted then the post is deleted.
    onDelete: 'CASCADE'
  });

  