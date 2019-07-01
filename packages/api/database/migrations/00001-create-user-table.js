"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING
      },
      verifyEmailToken: {
        allowNull: true,
        type: Sequelize.STRING
      },
      verifyEmailExpires: {
        type: Sequelize.DATE,
        allowNull: true
      },
      resetPasswordToken: {
        allowNull: true,
        type: Sequelize.STRING
      },
      resetPasswordExpires: {
        type: Sequelize.DATE,
        allowNull: true
      },
      status: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
