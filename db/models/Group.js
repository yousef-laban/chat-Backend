module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define("Group", {
    name: {
      type: DataTypes.STRING,
    },
  });

  // relation

  return Group;
};
