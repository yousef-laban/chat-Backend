const { User } = require("../db/models");
const { Profile } = require("../db/models");

const bcrypt = require("bcrypt");
const {
  JWT_SECRET,
  JWT_EXPIRATION_MS,
  MAILGUN_API_KEY,
} = require("../config/keys");
const jwt = require("jsonwebtoken");

const mailgun = require("mailgun-js");
const DOMAIN = "sandboxc77683475d7940a98259a9161772b036.mailgun.org";
const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: DOMAIN });

exports.signup = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create(req.body);
    req.body.userId = newUser.id;
    const newProfile = await Profile.create(req.body);
    const token = generateToken(newUser);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const { user } = req;
  const token = generateToken(req.user);
  await res.json({ token });
};

exports.verify = async (req, res, next) => {
  const token = generateVeriftyToken(req.body);
  console.log(req.body);

  const data = {
    from: "chat@chat.org",
    to: req.body.email,
    subject: "Email Verification",
    html: `
    <h2>  Please Verify Your Email</h2>

    <h3>Using The Website :</h3>
    <a href="http://localhost:3000/verify/${token}" ><button >Verify</button></a>

    <h3>Using The App :</h3>
    <a href="exp://192.168.1.66:19000" ><button >Verify</button></a>
    
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

    res.status(201).json(foundUser);
  } catch (error) {
    next(error);
  }
};
