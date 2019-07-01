"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      tableName: "users",
      modelName: "User"
    }
  );

  User.associate = function(models) {};

  return User;
};
