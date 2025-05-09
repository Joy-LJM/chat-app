// controller layer used to handle user related requests and connect with models(database)
const userInfo = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const result = await userInfo.findOne({
      username,
    });
    const { username: existingUser, email: existingEmail } = result || {};
    if (existingUser) {
      return res.json({ code: 0, message: "Username already exists" });
    }
    if (existingEmail) {
      return res.json({ code: 0, message: "Email already exists" });
    }
    const hashedPsw = await bcrypt.hash(password, 10);

    const user = await userInfo.create({
      username,
      password: hashedPsw,
      email,
    });

    // it only removes the password property from the JavaScript object, but it does not update the underlying MongoDB document.
    // delete user.password;

    return res.json({
      code: 1,
      message: "Registration successful",
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userInfo.findOne({ username });
    console.log(user, "ooo");
    if (!user) {
      return res.json({ code: 0, message: "Invalid username !" });
    }
    // To check a password:
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ code: 0, message: "Invalid  password !" });
    }

    res.json({
      code: 1,
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
    });
  } catch (err) {
    next(err);
  }
};
module.exports.setAvatar = async (req, res, next) => {
  try {
    const { id } = req.params || {};
    const { image } = req.body;
    const user = await userInfo.findById(id);
    user.avatarImage = image;
    user.isAvatarImageSet = true;
    user
      .save()
      .then((x) => {
        if (x) {
          res.json({
            code: 1,
            message: "Set avatar successful",
            user: {
              username: x.username,
              email: x.email,
              id: x._id,
              isAvatarImageSet: x.isAvatarImageSet,
              avatarImage: x.avatarImage,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.json({
          code: 0,
          message: error.message,
        });
      });
  } catch (err) {
    console.log(err);
  }
};
