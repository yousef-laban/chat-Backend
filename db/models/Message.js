module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    text: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.STRING,
    },
  });

  // relation
  Message.associate = (models) => {
    models.User.hasMany(Message, {
      foreignKey: "userId",
      allowNull: false,
    });

    Message.belongsTo(models.User, {
      foreignKey: "userId",
    });

    models.Group.hasMany(Message, {
      foreignKey: "groupId",
      allowNull: false,
    });

    Message.belongsTo(models.Group, {
      foreignKey: "groupId",
    });
  };

  return Message;
};
