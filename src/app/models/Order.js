const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      // required: true,
    },

    phone: {
      type: Number,
      // required: true,
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        // required: true,
      },
      price: {
        type: Number,
        // required: true,
      },
      quantity: {
        type: Number,
        // required: true,
      },
      product_url: {
        type: String,
        // required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        // required: true,
      },
    },
  ],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  paymentInfo: {
    id: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      // required: true,
    },
  },
  paidAt: {
    type: Date,
    // required: true,
  },
  Subtotal: {
    type: Number,
    // required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    // required: true,
    default: 0,
  },
  shippingFee: {
    type: Number,
    // required: true,
    default: 0,
  },
  Amount: {
    type: Number,
    // required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    // required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
