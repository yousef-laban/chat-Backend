const { Profile } = require("../db/models");

// const Profile = require("../db/models/Profile"); //Remove unused import

exports.fetchProfiles = async (req, res, next) => {
  try {
    const foundProfiles = await Profile.findAll();
    res.json(foundProfiles);
  } catch (error) {
    next(error);
  }
};

//Rename to updateProfile
exports.profileUpdate = async (req, res, next) => {
  try {
    if (req.file)
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;

    const foundProfile = await Profile.findOne({
      where: { userId: req.body.userId },
    });
    //Rename to updatedProfile
    const newProfile = await foundProfile.update(req.body);
    res.status(201).json(newProfile); //Change to res.status(204).end
  } catch (error) {
    next(error);
  }
};
