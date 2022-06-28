const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Bạn phải nhập tên !!!"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Bạn phải nhập email !!!"],
      // validate: [validator.isEmail, "vui lòng nhập đúng định dạng của email"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Bạn phải nhập mật khẩu!!!"],
      minLength: [6, "mật khẩu ít nhất 6 ký tự !!!"],
    },
    // avatar: [
    //   {
    //     public_id: {
    //       type: String,
    //       // required: true,
    //     },
    //     url: {
    //       type: String,
    //       // required: true,
    //     },
    //   },
    // ],
    role: {
      type: String,
      default: "user",
    },
    isAdmin: {
      type: Boolean,
    },
    status: {
      type: Number,
    },
    resetPasswordToken: String,
    resertPasswordExperi: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let user = this; // get userget the user initialized from mongose

  //bcrypt pass
  bcrypt.hash(user.password, 10, function (error, hash) {
    if (error) {
      return next(error);
    } else {
      user.password = hash;
      next();
    }
  });
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// // JWT TOKEN
// userSchema.methods.getJWTToken = function () {
//   return jwt.sign({ id: this._id }, process.env.APP_SECRET, {
//     expiresIn: process.env.APP_EXPIRE,
//   });
// };

// // Compare Password
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };
