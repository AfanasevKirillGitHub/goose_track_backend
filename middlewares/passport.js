const passport = require("passport");
const { Strategy } = require("passport-google-oauth2");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } =
  process.env;

const googleParam = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL,
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, displayName } = profile;
    const user = await User.findOne({ email });
    if (user) {
      done(null, user); //req.user=user
    }
    const hashPassword = await bcrypt.hash(uuid.v4(), 10);
    const newUser = await User.create({
      email,
      name: displayName,
      password: hashPassword,
    });
    done(null, newUser);
  } catch (error) {
    done(error);
  }
};

const googleStrategy = new Strategy(googleParam, googleCallback);

passport.use("google", googleStrategy);

module.exports = passport;
