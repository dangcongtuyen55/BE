const express = require("express");
const { verifyToken } = require("../app/middlewares/verifyToken");

const {
  getAllCatagories,
  createCatagory,
  updateCatagory,
  deleteCatagory,
} = require("../app/controllers/catagoryController");

const Router = express.Router();

Router.route("/").get(getAllCatagories).post(verifyToken, createCatagory);
Router.route("/:CatagoryId")
  .put(verifyToken, updateCatagory)
  .delete(verifyToken, deleteCatagory);

module.exports = Router;
