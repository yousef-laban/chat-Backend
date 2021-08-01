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
      as: "sender",

      allowNull: false,
    });

    Message.belongsTo(models.User, {
      foreignKey: "userId",
      as: "sender",
    });

    models.Group.hasMany(Message, {
      foreignKey: "groupId",
      allowNull: false,
      as: "group",
    });

    Message.belongsTo(models.Group, {
      foreignKey: "groupId",
      as: "group",
    });
  };

  return Message;
};
