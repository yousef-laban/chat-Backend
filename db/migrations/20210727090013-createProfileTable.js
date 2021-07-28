"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Profiles", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      fullName: {
        type: Sequelize.STRING,
        defauleValue: "No Name", //defaultValue not defauleValue
      },

      gender: {
        type: Sequelize.STRING,
        defauleValue: "No Gender", //defaultValue not defauleValue
      },

      image: {
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Profiles");
  },
};
