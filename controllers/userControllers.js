const { User, Profile } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  JWT_EXPIRATION_MS,
  MAILGUN_API_KEY,
} = require("../config/keys");
const mailgun = require("mailgun-js");
const DOMAIN = "sandboxe13e2a94d24745c08f0b8135e4a82853.mailgun.org";
const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: DOMAIN });

exports.signup = async (req, res, next) => {
  //Create a variable saltRounds
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10); //Replace 10 with saltRounds
    const newUser = await User.create(req.body);
    req.body.userId = newUser.id;
    const newProfile = await Profile.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

//Remove next
exports.signin = async (req, res, next) => {
  const { user } = req; //Unused
  const token = generateToken(req.user);
  await res.json({ token });
};

//Remove next
exports.verify = async (req, res, next) => {
  const token = generateVeriftyToken(req.body);
  console.log(req.body); //Remove console log

  const data = {
    from: "chat@chat.org",
    to: req.body.email,
    subject: "Email Verification",
    html: `
    <h2>Please Verify Your Email</h2>
    <a href="http://localhost:3000/verify/${token}"><button>Verify</button></a>
    `,
  };
  mg.messages().send(data, function (error, body) {
    console.log(body);
  });

  await res.json({ token });
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    verify: user.verify,
    phoneNum: user.phoneNum,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

const generateVeriftyToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    verify: user.verify,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

exports.fetchUser = async (userId, next) => {
  try {
    const foundUser = await User.findByPk(userId);
    return foundUser;
  } catch (error) {
    next(error);
  }
};

exports.userUpdate = async (req, res, next) => {
  try {
    const foundUser = await User.findByPk(req.body.id);
    await foundUser.update({ verify: "true" });
    res.status(201).json(foundUser); //Change to res.status(204).end
  } catch (error) {
    next(error);
  }
};
