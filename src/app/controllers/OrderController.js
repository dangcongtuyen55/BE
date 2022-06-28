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
  try {
    // const { userId } = req.user;

    const orders = await Order.create({
      ...req.body,
    });
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
