const { Group } = require("../db/models");

// const Profile = require("../db/models/Profile");

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
    res.status(201).json(newgroup);
  } catch (error) {
    next(error);
  }
};
