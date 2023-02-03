// Destructuring the model and datatypes from the library.
const { Model, DataTypes } = require('sequelize');
// handling passwords
const bcrypt = require('bcrypt');
// requring the connection to the database.
const sequelize = require('../config/connection');