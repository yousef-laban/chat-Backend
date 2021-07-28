module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    fullName: {
      type: DataTypes.STRING,
      defauleValue: "No Name", //defaultValue not defauleValue
    },

    gender: {
      type: DataTypes.STRING,
      defauleValue: "No Gender", //defaultValue not defauleValue
    },

    image: {
      type: DataTypes.STRING,
    },
  });

  Profile.associate = (models) => {
    models.User.hasOne(Profile, {
      foreignKey: "userId", // change the column name frome ShopId tp shopId
    });

    Profile.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };

  return Profile;
};
