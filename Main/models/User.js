// Destructuring the model and datatypes from the library.
const { Model, DataTypes } = require('sequelize');
// handling passwords
const bcrypt = require('bcrypt');
// requring the connection to the database.
const sequelize = require('../config/connection');

// this method is used for verifying the password
class User extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }