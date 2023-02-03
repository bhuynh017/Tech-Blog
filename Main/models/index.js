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

  // one to many relationship. Where post can have many comments
  Post.hasMany(Comment, {
    foreignKey: 'postId',
    // if a post is deleted then all comments are deleted.
    onDelete: 'CASCADE'
  });
  
  // Also a one to many relationship where the comment is associated with one single user. 
  Comment.belongsTo(User, {
    foreignKey: 'userId',
    // if a user is deleted then all comments should be deleted.
    onDelete: 'CASCADE'
  });
  
  module.exports = {
    User,
    Comment,
    Post
  };