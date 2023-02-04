// Destructuring the model and datatypes from the library.
const { Model, DataTypes } = require("sequelize");
// handling passwords
const bcrypt = require("bcrypt");
// requring the connection to the database.
const sequelize = require("../config/connection");

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
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
  },
  {
    // these hooks hash the password using the bcrypt library.
    hooks: {
      // beforeCreate hook is being called before the new user is created.
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // beforeUpdate is being called before a new user is updated.
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "User",
  }
);

module.exports = User;