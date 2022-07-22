const Order = require("../models/Order");
const mailer = require("../../mailer");
const User = require("../models/User");
exports.NewOrder = async (req, res, next) => {
  // try {
  //   const {
  //     shippingInfo,
  //     orderItems,
  //     paymentInfo,
  //     itemsPrice,
  //     taxPrice,
  //     shippingPrice,
  //     totalPrice,
  //   } = req.body;
  //   console.log("TCL: exports.NewOrder -> req.body", req.body);

  //   const order = await Order.create({
  //     shippingInfo,
  //     orderItems,
  //     paymentInfo,
  //     itemsPrice,
  //     taxPrice,
  //     shippingPrice,
  //     totalPrice,
  //     paidAt: Date.now(),
  //     user: req.user._id,
  //   });

  //   res.status(201).json({
  //     success: true,
  //     order,
  //   });
  //   console.log("TCL: exports.NewOrder -> order", order);
  // } catch (error) {
  //   res.json(error);
  // }
  //aaaaaa
  try {
    const { userId } = req.user;

    const orders = await Order.create({
      ...req.body,
      user: userId,
    });
    const user = await User.findOne({ _id: userId });
    const subject = "Xin chào quý khách!";
    await mailer.sendMail(user, subject, orders);
    res.status(200).json({
      status: "success",
      orders,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSingleOrder = async (req, res, next) => {
  try {
    // const { userId } = req.user;
    // const { id } = req.params;
    // const order = await Order.findById(id).populate("user", "name email");
    // res.status(200).json({
    //   success: true,
    //   order,
    // });
    const { id } = req.params;
    console.log(id);
    const order = await Order.findById(id).populate("user", "name email");
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.json(error);
  }
};
exports.myOrder = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const orders = await Order.find({ user: userId });
    // console.log("TCL: exports.myOrder -> user", user);

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.json(error);
  }
};
exports.deleteAll = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const orders = await Order.deleteMany({ user: userId });
    // console.log("TCL: exports.myOrder -> user", user);

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.json(error);
  }
};

//ADMIN

exports.getAllOrders = async (req, res, next) => {
  // const { userId } = req.user;
  const orders = await Order.find()
    .sort({ _id: -1 })
    .populate("user", "name email");
  // console.log("TCL: exports.myOrder -> user", user);

  res.status(200).json(orders);
};

exports.deliveredOrder = async (req, res, next) => {
  const { userId } = req.user;
  const { id } = req.params;
  const order = await Order.findById(id);
  // console.log("TCL: exports.myOrder -> user", user);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updateOrder = await order.save();
    res.status(200).json({
      success: true,
      status: "success",
      message: "Order delivered successfully",
      deliveredBy: userId,
    });
  } else {
    res.json(error);
  }
};

exports.confirmedOrder = async (req, res, next) => {
  const { userId } = req.user;
  const { id } = req.params;
  const order = await Order.findById(id);
  // await Order.findByIdAndUpdate(id, { isOrdered: true });
  if (order) {
    order.isConfirmed = true;
    order.confirmedAt = Date.now();

    const updateOrder = await order.save();
    res.status(200).json({
      success: true,
      status: "success",
      message: "Order Confirmed successfully",
      confirmBy: userId,
    });
  } else {
    res.json(error);
  }
};
