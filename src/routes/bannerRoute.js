const express = require("express");
const { verifyToken } = require("../app/middlewares/verifyToken");

const {
  getAllBanners,
  createBanner,
  updateBanner,
  deleteOneBanner,
  restoreOneBanner,
  getBannerDetail,
} = require("../app/controllers/bannerController");

const Router = express.Router();

Router.route("/banners").get(getAllBanners);
Router.route("/banners/new").post(verifyToken, createBanner);
Router.route("/banner/:id")
  .put(verifyToken, updateBanner)
  .delete(verifyToken, deleteOneBanner)
  .get(getBannerDetail);
Router.route("/restore/banner/:id").delete(verifyToken, restoreOneBanner);

module.exports = Router;
