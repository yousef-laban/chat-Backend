module.exports = (sequelize, DataTypes) => {
  const Group_User = sequelize.define("Group_User");
  // relation

  Group_User.associate = (models) => {
    models.User.belongsToMany(models.Group, {
      through: Group_User,
      foreignKey: "groupId",
    });
    models.Group.belongsToMany(models.User, {
      through: Group_User,
      foreignKey: "userId",
    });
  };

  return Group_User;
};
