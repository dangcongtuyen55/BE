const Category = require("../models/Catagory");
const slugify = require("slugify");

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().populate("author", "name");
    res.status(200).json({
      status: "success",
      results: categories.length,
      categories,
    });
  } catch (error) {
    next(error);
  }
};
exports.createCategory = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const categories = await Category.create({
      ...req.body,
      author: userId,
      slug: slugify(req.body.name),
    });
    res.status(200).json({
      status: "success",
      data: {
        categories,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const categories = await Category.findByIdAndUpdate(
      categoryId,
      { ...req.body },
      { new: true },
      { runValidator: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        categories,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    await Category.findByIdAndDelete(categoryId);
    res.status(200).json({
      status: "success",
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
