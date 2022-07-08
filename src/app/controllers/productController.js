const Product = require("../models/Product");
const slugify = require("slugify");
const User = require("../models/User");
const Features = require("../../utils/Features");
// const multer = requried("multer");

// const upload = multer({
//   dest: "public/Product_Image",
// });
//new
exports.getAllProducts = async (req, res, next) => {
  try {
    const resultPerPage = 12;

    const productsCount = await Product.countDocuments();

    const feature = new Features(Product.find({ isDeleted: false }), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const products = await feature.query;
    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
    });
  } catch (error) {
    next(error);
    // res.json(error);
  }
};
exports.getAllProductsDisplay = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("createBy", "name")
      .select(
        "name slug price  description rating offer stock reviews createBy product_url createdAt isDeleted"
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
// exports.deleteProduct = async (req, res, next) => {
//   try {
//     const { userId } = req.user;
//     const { id } = req.params;
//     await Product.findByIdAndUpdate(id, { isDeleted: true });
//     res.status(200).json({
//       status: "success",
//       message: "Product deleted successfully",
//       deleteBy: userId,
//     });
//   } catch (error) {
//     next(error);
//   }
//   // const product = await Product.findByIdAndDelete(req.params.id);
//   // res.status(200).json({
//   //   success: true,
//   //   message: "Product deleted successfully",
//   // });
// };

exports.deleteProduct = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, { isDeleted: true });
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

exports.restoreProduct = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    // await Product.findByIdAndUpdate(id, { isDeleted: false });
    const products = await Product.findByIdAndUpdate(id, {
      ...req.body,
      restoreBy: userId,
      isDeleted: false,
    });
    res.status(200).json({
      status: "success",
      message: "Product restore successfully",
      products,
    });
  } catch (error) {
    next(error);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    console.log(req.body);
    const { id } = req.params;
    const { userId } = req.user;
    const user = await User.findOne({ _id: userId });
    // const name = req.user;

    const review = {
      user: userId,
      name: user.name,
      rating: Number(rating),
      comment,
    };
    console.log("TCL: exports.createReview ->  user.name", user.name);
    const product = await Product.findById(id);

    const isReviewed = product.reviews.find(
      (review) => review.user === req.user._id
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user === req.user._id)
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.rating = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      product,
    });

    // const product = await Product.findById(id);
    // if (product) {
    //   const alreadyReviewed = product.reviews.find(
    //     (r) => r.user.toString() === req.user._id.toString()
    //   );
    //   product.reviews.push(review);
    //   product.numOfReviews = product.reviews.length;
    //   product.rating =
    //     product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    //     product.reviews.length;
    //   // res.status(200).json({
    //   //   status: "success",
    //   //   message: "Add reviews successfully",
    //   //   product,
    //   // });
    //   await product.save();
    //   res.status(200).json({
    //     status: "success",
    //     message: "Add reviews successfully",
    //     product,
    //   });
    // } else {
    //   message = "error";
    // }
  } catch (error) {
    next(error);
  }
};
