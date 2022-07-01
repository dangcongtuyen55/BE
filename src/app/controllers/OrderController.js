const Order = require("../models/Order");
const mailer = require("../../mailer");
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
    console.log("TCL: exports.NewOrder -> userId", userId);

    const orders = await Order.create({
      ...req.body,
      customer: userId,
    });
    console.log("TCL: exports.NewOrder -> orders", orders);

    const subject = "con me may!";
    await mailer.sendMail(subject, orders);
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
    const order = await Order.findById(id);
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
    const orders = await Order.find({ customer: userId });
    // console.log("TCL: exports.myOrder -> user", user);

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.json(error);
  }
};
