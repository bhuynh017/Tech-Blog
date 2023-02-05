// importing the modules 
const { Sequelize, Model, DataTypes } = require('sequelize');
// importing the database config
const sequelize = require('../config/connection');

class Comment extends Model {}

// creating a new model called Comment containing one body which is a string.
Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize
  }
);

module.exports = Comment;
