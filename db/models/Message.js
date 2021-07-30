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
      foreignKey: "userId", // change the column name frome ShopId tp shopId
      allowNull: false,
    });

    Message.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };

  return Message;
};
