const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("../config/keys");
const { User } = require("../db/models");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username: username } }); //You can replace {username: username} with {username}
    //Rename to passwordsMatch
    const passwordMAtch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    return done(null, passwordMAtch ? user : false);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (payload, done) => {
    if (Date.now() > payload.exp) return done(false);
    try {
      const user = await User.findByPk(payload.id);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
