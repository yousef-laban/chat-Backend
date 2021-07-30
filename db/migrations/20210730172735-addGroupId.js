"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Messages", "groupId", {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "Groups",
        },
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Messages", "groupId");
  },
};
