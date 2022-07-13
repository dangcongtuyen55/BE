const express = require("express");
const { verifyToken } = require("../app/middlewares/verifyToken");

const {
  NewOrder,
  getSingleOrder,
  myOrder,
  deleteAll,
  getAllOrders,
  deliveredOrder,
  confirmedOrder,
} = require("../app/controllers/OrderController");

const Router = express.Router();

Router.route("/order/new").post(verifyToken, NewOrder);
Router.route("/order/:id").get(verifyToken, getSingleOrder);
Router.route("/orders/me").get(verifyToken, myOrder);
Router.route("/deleteall/:id").delete(verifyToken, deleteAll);
Router.route("/orders/all").get(verifyToken, getAllOrders);
Router.route("/order/:id/delivered").put(verifyToken, deliveredOrder);
Router.route("/order/:id/confirmed").put(verifyToken, confirmedOrder);

module.exports = Router;
