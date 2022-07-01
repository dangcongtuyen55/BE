const express = require("express");
const { verifyToken } = require("../app/middlewares/verifyToken");

const {
  NewOrder,
  getSingleOrder,
  myOrder,
} = require("../app/controllers/OrderController");

const Router = express.Router();

Router.route("/order/new").post(verifyToken, NewOrder);
Router.route("/order/:id").get(verifyToken, getSingleOrder);
Router.route("/orders/me").get(verifyToken, myOrder);

module.exports = Router;
