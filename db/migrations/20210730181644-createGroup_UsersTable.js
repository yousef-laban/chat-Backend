"use strict";

const { NOW } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Group_User", {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },

      groupId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Group_User");
  },
};
