const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      // required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, " Tên sản phẩm không được bỏ trống !!! "],
    },

    slug: {
      type: String,
      unique: true,
    },

    price: {
      type: Number,
      required: [true, " Giá sản phẩm không được bỏ trống !!!"],
    },
    // current_price: {
    //   type: Number,
    // },
    // discount_rate: {
    //   type: Number,
    // },
    stock: {
      type: Number,
    },

    description: {
      type: String,
      required: [true, " Mô tả sản phẩm không được bỏ trống !!! "],
    },

    offer: {
      type: Number,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    product_url: {
      type: String,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },

    reviews: [
      // {
      //   name: {
      //     type: String,
      //     required: true,
      //   },
      //   rating: {
      //     type: Number,
      //     required: true,
      //   },
      //   comment: {
      //     type: String,
      //     required: true,
      //   },
      // },
      reviewSchema,
    ],
    // user: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    catagory: {
      type: String,
      // required: true,
    },
    type_product: {
      type: String,
    },

    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    updateBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deleteBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updateAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
