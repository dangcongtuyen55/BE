const express = require("express");
const { verifyToken } = require("../app/middlewares/verifyToken");

const {
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} = require("../app/controllers/bannerController");

const Router = express.Router();

Router.route("/banners").get(getAllBanners);
Router.route("/new").post(verifyToken, createBanner);
Router.route("/banner/:id")
  .put(verifyToken, updateBanner)
  .delete(verifyToken, deleteBanner);

module.exports = Router;
