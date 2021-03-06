const express = require("express");
const {
  login,
  register,
  getCurrentUser,
  getInfoUser,
  updatePassword,
  updateProfile,
  getDetailUser,
  getAllUsers,
  // logout,
} = require("../app/controllers/authController");
const { checkCurrentUser } = require("../app/middlewares/checkCurrentUser");

const Router = express.Router();

Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/").get(checkCurrentUser, getCurrentUser);
Router.route("/me").get(checkCurrentUser, getInfoUser);
Router.route("/password/update/").post(checkCurrentUser, updatePassword);
Router.route("/me/update/profile").post(checkCurrentUser, updateProfile);
// Router.route("/logout").get(logout);
Router.route("/user/:id").get(getDetailUser);
Router.route("/users").get(getAllUsers);
module.exports = Router;
