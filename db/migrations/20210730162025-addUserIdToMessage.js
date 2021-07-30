"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Messages", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "Users",
        },
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Messages", "userId");
  },
};
