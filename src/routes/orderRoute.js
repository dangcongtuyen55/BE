const express = require("express");
const { verifyToken } = require("../app/middlewares/verifyToken");

const {
  NewOrder,
  getSingleOrder,
  myOrder,
  deleteAll,
} = require("../app/controllers/OrderController");

const Router = express.Router();

Router.route("/order/new").post(verifyToken, NewOrder);
Router.route("/order/:id").get(verifyToken, getSingleOrder);
Router.route("/orders/me").get(verifyToken, myOrder);
Router.route("/deleteall/:id").delete(verifyToken, deleteAll);

module.exports = Router;
