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

  // new model called User and using "init" method of the sequalize library.
  User.init(
    {
        // three fields
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4]
        }
      }
    },

  )