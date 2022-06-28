const express = require("express");
const { verifyToken } = require("../app/middlewares/verifyToken");

const { NewOrder } = require("../app/controllers/OrderController");

const Router = express.Router();

Router.route("/order/new").post(NewOrder);

module.exports = Router;
