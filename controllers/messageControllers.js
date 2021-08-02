const { Message, User, Group, Profile } = require("../db/models");

// const Profile = require("../db/models/Profile");

exports.fetchAllMessages = async (req, res, next) => {
  try {
    const allMessages = await Message.findAll({
      attributes: {
        exclude: ["userId", "updatedAt"],
      },

      include: {
        model: User,
        as: "sender",

        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "verify"],
        },

        include: {
          model: Profile,
          as: "profile",
          attributes: {
            exclude: ["createdAt", "updatedAt", "userId"],
          },
        },
      },
    });
    res.json(allMessages);
  } catch (error) {
    next(error);
  }
};

// Review: messageCreate not messageCreat
exports.messageCreat = async (req, res, next) => {
  try {
    //   if (req.file)
    //     req.body.url = `http://${req.get("host")}/media/${req.file.filename}`;

    //   req.body.userId = req.shop.id;

    const newMessage = await Message.create(req.body);
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};
