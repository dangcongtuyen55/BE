const express = require("express");
const { verifyToken } = require("../app/middlewares/verifyToken");
const { isAuthenticatedUser } = require("../app/middlewares/auth");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
} = require("../app/controllers/productController");

const Router = express.Router();

Router.route("/products").get(getAllProducts);
Router.route("/new").post(verifyToken, createProduct);
Router.route("/product/:id")
  .put(verifyToken, updateProduct)
  .delete(verifyToken, deleteProduct)
  .get(getProductDetail);

module.exports = Router;
