const express = require("express");
const { verifyToken } = require("../app/middlewares/verifyToken");

const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryDetail,
} = require("../app/controllers/catagoryController");

const Router = express.Router();

Router.route("/all").get(getAllCategories);
Router.route("/new").post(verifyToken, createCategory);
Router.route("/:id")
  .put(verifyToken, updateCategory)
  .delete(verifyToken, deleteCategory)
  .get(getCategoryDetail);
module.exports = Router;
