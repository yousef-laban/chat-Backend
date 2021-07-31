module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    fullName: {
      type: DataTypes.STRING,
      defauleValue: "No Name",
    },

    gender: {
      type: DataTypes.STRING,
      defauleValue: "No Gender",
    },

    image: {
      type: DataTypes.STRING,
    },
  });

  // relation
  Profile.associate = (models) => {
    models.User.hasOne(Profile, {
      as: "profile",
      foreignKey: "userId", // change the column name frome ShopId tp shopId
    });

    Profile.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };

  return Profile;
};
