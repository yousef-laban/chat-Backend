module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        isEmail: true,
      },
    },

    phoneNum: {
      type: DataTypes.STRING,
    },

    verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return User;
};
