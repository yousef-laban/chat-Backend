const { Group, Group_User } = require("../db/models");

exports.fetchAllGroups = async (req, res, next) => {
  try {
    const allGroups = await Group.findAll();
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

    res.status(201).json(groupUser);
  } catch (error) {
    next(error);
  }
};
