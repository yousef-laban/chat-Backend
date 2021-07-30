module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define("Group", {
    name: {
      type: DataTypes.STRING,
    },
  });

  // relation

  Group.associate = (models) => {
    models.User.belongsToMany(Group, {
      through: "Group-User",
      foreignKey: "groupId",
    });
    Group.belongsToMany(models.User, {
      through: "Group-User",
      foreignKey: "userId",
    });
  };

  return Group;
};
