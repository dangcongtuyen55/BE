const express = require("express");
const { verifyToken } = require("../app/middlewares/verifyToken");
const { isAuthenticatedUser } = require("../app/middlewares/auth");

const {
  getAllProducts,
  getAllProductsDisplay,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
  restoreProduct,
} = require("../app/controllers/productController");

const Router = express.Router();

Router.route("/products").get(getAllProducts);
Router.route("/all").get(getAllProductsDisplay);
Router.route("/new").post(verifyToken, createProduct);
Router.route("/product/:id")
  .put(verifyToken, updateProduct)
  .delete(verifyToken, deleteProduct)
  .delete(verifyToken, restoreProduct)
  .get(getProductDetail);

module.exports = Router;
