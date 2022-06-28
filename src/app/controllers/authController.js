const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      //Error:  Email is not correct
      const err = new Error("Email is not correct !!");
      err.statusCode = 400;
      return next(err);
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
      res.status(200).json({
        status: "success",
        user: {
          token,
          email: user.email,
          userName: user.name,
          role: user.role,
        },
      });
    } else {
      //Error: password is not correct
      const err = new Error("Password is not correct !!");
      err.statusCode = 400;
      return next(err);
    }
  } catch (error) {
    res.json(error);
  }
  // res.status(200).json({ message: "login" });
};

exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
    res.status(200).json({
      status: "success",
      user: {
        token,
        email: user.email,
        userName: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.getCurrentUser = async (req, res, next) => {
  try {
    const data = { user: null };
    if (req.user) {
      const user = await User.findOne({ _id: req.user.userId });
      user = { userName: user.name };
    }
    res.status(200).json({
      status: "success",
      user,
    });
    console.log(data);
    console.log(data);
  } catch (error) {
    res.json(error);
  }
};

exports.getInfoUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      status: "success",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.json(error);
  }
};

exports.updateInfoUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
    if (user) {
      user.name = req.body.name || req.body.name;
      user.email = req.body.email || req.body.email;
      if (user.body.password) {
        user.password = req.body.password;
      }
      const updateUser = await user.save();
      res.status(200).json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        createdAt: updateUser.createdAt,
        token,
      });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.json(error);
  }
};
// exports.getAllUser = async (req, res, next) => {
//   const user = await User.find({});
//   res.status(200).json({
//     status: "success",
//     result: user.length,
//     data: user,
//   });
// };

// exports.logout = async (req, res, next) => {
//   res.cookie("token", null, {
//     expires: new Date(Date.now()),
//     httpOnly: true,
//   });
//   res.status(200).json({
//     success: true,
//     message: "Logged Out",
//   });
// };
