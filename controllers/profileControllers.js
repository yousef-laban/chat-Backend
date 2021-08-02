const { Profile } = require("../db/models");
// REVIEW: Remove commented out code
// const Profile = require("../db/models/Profile");

exports.fetchProfiles = async (req, res, next) => {
  try {
    const foundProfiles = await Profile.findAll();
    res.json(foundProfiles);
  } catch (error) {
    next(error);
  }
};

exports.profileUpdate = async (req, res, next) => {
  try {
    if (req.file)
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;

    const foundProfile = await Profile.findOne({
      where: { userId: req.body.userId },
    });

    const newProfile = await foundProfile.update(req.body);
    res.status(201).json(newProfile);
  } catch (error) {
    next(error);
  }
};
