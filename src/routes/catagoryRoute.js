const express = require("express");
const { verifyToken } = require("../app/middlewares/verifyToken");

const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../app/controllers/catagoryController");

const Router = express.Router();

Router.route("/all").get(getAllCategories).post(verifyToken, createCategory);
Router.route("/:CatagoryId")
  .put(verifyToken, updateCategory)
  .delete(verifyToken, deleteCategory);

module.exports = Router;
