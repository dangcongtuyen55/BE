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
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        // user,
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
  // try {
  //   const { userId } = req.user;
  //   console.log(userId);
  //   const user = await User.findById(userId);
  //   res.status(200).json({
  //     status: "success",
  //     // user: {
  //     //   _id: user._id,
  //     //   name: user.name,
  //     //   email: user.email,
  //     //   createdAt: user.createdAt,
  //     // },
  //     user,
  //   });
  // } catch (error) {
  //   res.json(error);
  // }
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
    const { userId } = req.user;
    const user = await User.findOne({ _id: userId });
    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
    if (user) {
      user.name = req.body.name || req.body.name;
      user.email = req.body.email || req.body.email;

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

exports.updatePassword = async (req, res, next) => {
  try {
    // const { userId } = req.user;
    // console.log("TCL: exports.updatePassword -> userId", userId);
    // const user = await User.findOne({ _id: userId });
    // if (user) {
    //   if (bcrypt.compareSync(req.body.password, user.password)) {
    //     if (!bcrypt.compareSync(req.body.new_password, user.password)) {
    //       const hash = await bcrypt.hash(req.body.new_password, 10);
    //       const newData = await User.findByIdAndUpdate(
    //         user._id,
    //         { password: hash },
    //         { new: true, runValidator: true }
    //       );
    //       const token = jwt.sign(
    //         { userId: newData._id },
    //         process.env.APP_SECRET
    //       );
    //       res.status(200).json({
    //         status: "success",
    //         payload: "mật khẩu đổi thành công",
    //         payload: {
    //           token,
    //           email: newData.email,
    //           userName: newData.username,
    //         },
    //       });
    //     } else {
    //       res.status(200).json({
    //         status: "success",
    //         payload: "mật khẩu cũ và mới trùng nhau",
    //       });
    //     }
    //   } else {
    //     res.status(200).json({
    //       status: "success",
    //       payload: "Mật khẩu không đúng",
    //     });
    //   }
    // }
    const { userId } = req.user;
    const user = await User.findById(userId).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      res.status(200).json({
        status: "success",
        payload: "Mật khẩu cũ không chính xác",
      });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      res.status(200).json({
        status: "success",
        payload: "Mật khẩu không khớp",
      });
    }

    user.password = req.body.newPassword;

    await user.save();
    res.status(200).json({
      status: "success",
      payload: "mật khẩu đổi thành công",
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
    const { userId } = req.user;
    const user = await User.findByIdAndUpdate(userId, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      payload: "cập nhật thông tin thành công",
      user,
      newUserData,
    });

    // const { userId } = req.user;
    // const user = await User.findOne({ _id: userId });
    // const newData = await User.findByIdAndUpdate(
    //   user._id,
    //   { ...req.body },
    //   { new: true, runValidator: true }
    // );
    // const token = jwt.sign({ userId: newData._id }, process.env.APP_SECRET);
    // console.log(user);
    // res.status(200).json({
    //   status: "success",
    //   token,
    //   id: user._id,
    //   email: newData.email,
    //   name: newData.name,
    // });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("name email role");
    res.status(200).json({
      status: "success",
      result: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

exports.getDetailUser = async (req, res, next) => {
  try {
    // const id = req.params.id;
    const { id } = req.params;

    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
