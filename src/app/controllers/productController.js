const Product = require("../models/Product");
const slugify = require("slugify");
// const multer = requried("multer");

// const upload = multer({
//   dest: "public/Product_Image",
// });
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("createBy", "name")
      .select(
        "name slug price  description rating offer stock reviews createBy product_url createdAt"
      );
    res.status(200).json({
      status: "success",
      results: products.length,
      products,
    });
  } catch (error) {
    next(error);
    // res.json(error);
  }
};

exports.getProductDetail = async (req, res, next) => {
  try {
    // const id = req.params.id;
    const { id } = req.params;
    console.log(id);
    const product = await Product.findById(id);
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const products = await Product.create({
      ...req.body,
      createBy: userId,
      slug: slugify(req.body.name),
    });
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    console.log(req.params);
    const products = await Product.findByIdAndUpdate(
      id,
      { ...req.body, updateBy: userId, slug: slugify(req.body.name) },
      { new: true, runValidator: true }
    );
    console.log(products);
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
      deleteBy: userId,
    });
  } catch (error) {
    next(error);
  }
  // const product = await Product.findByIdAndDelete(req.params.id);
  // res.status(200).json({
  //   success: true,
  //   message: "Product deleted successfully",
  // });
};
