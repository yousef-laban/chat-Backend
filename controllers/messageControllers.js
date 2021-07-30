const { Message } = require("../db/models");

// const Profile = require("../db/models/Profile");

exports.fetchAllMessages = async (req, res, next) => {
  try {
    const allMessages = await Message.findAll();
    res.json(allMessages);
  } catch (error) {
    next(error);
  }
};

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
