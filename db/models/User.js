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
      validate: {
        len: {
          args: [6],
          msg: "Minimum password length is 6 characters",
        },
        notEmpty: {
          args: [true],
          msg: "Please enter a password",
        },
      },
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
      allowNull: false,
      unique: true,
      validate: {
        isValidPhoneNo: function (value) {
          if (!value) return value;

          var regexp = /^[0-9]+$/;
          var values = Array.isArray(value) ? value : [value];

          values.forEach(function (val) {
            if (!regexp.test(val)) {
              throw new Error("Number only is allowed.");
            }
          });
          return value;
        },
      },
    },

    verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return User;
};
