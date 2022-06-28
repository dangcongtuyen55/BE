const mongoose = require("mongoose");

const catagorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, " Tên sản phẩm không được bỏ trống !!! "],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    slug: {
      type: String,
      unique: true,
    },

    parentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Catagory", catagorySchema);
