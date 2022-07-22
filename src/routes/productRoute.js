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
  createReview,
  getAllProductsInSlide,
  deleteAll,
  initialData,
} = require("../app/controllers/productController");

const Router = express.Router();

Router.route("/products").get(getAllProducts);
Router.route("/products/slide").get(getAllProductsInSlide);
Router.route("/all").get(getAllProductsDisplay);
Router.route("/new").post(verifyToken, createProduct);
Router.route("/product/:id")
  .put(verifyToken, updateProduct)
  .delete(verifyToken, deleteProduct)
  .get(getProductDetail);
Router.route("/restore/:id").delete(verifyToken, restoreProduct);
Router.route("/review/:id").post(verifyToken, createReview);
Router.route("/products/deleteall").post(verifyToken, deleteAll);
Router.route("/productsIni").get(initialData);
module.exports = Router;
