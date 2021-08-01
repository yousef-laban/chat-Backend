const { Group, Group_User, User } = require("../db/models");

exports.fetchAllGroups = async (req, res, next) => {
  try {
    const allGroups = await Group.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "username"],
          through: {
            model: Group_User,
          },
        },
      ],
    });
    res.json(allGroups);
  } catch (error) {
    next(error);
  }
};

exports.groupCreat = async (req, res, next) => {
  try {
    const newgroup = await Group.create(req.body);

    const groupUser = await req.body.usersId.map((user) => ({
      ...user,
      groupId: newgroup.id,
    }));

    await Group_User.bulkCreate(groupUser);

    const finalForm = {
      ...newgroup.toJSON(),
      users: req.body.usersId,
    };

    res.status(201).json(finalForm);
  } catch (error) {
    next(error);
  }
};
