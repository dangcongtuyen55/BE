const Catagory = require("../models/Catagory");
const slugify = require("slugify");

exports.getAllCatagories = async (req, res, next) => {
  try {
    const catagories = await Catagory.find().populate("author");
    res.status(200).json({
      status: "success",
      results: catagories.length,
      data: {
        catagories,
      },
    });
  } catch (error) {
    res.json(error);
  }
};
exports.createCatagory = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const catagories = await Catagory.create({
      ...req.body,
      author: userId,
      slug: slugify(req.body.name),
    });
    res.status(200).json({
      status: "success",
      data: {
        catagories,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCatagory = async (req, res, next) => {
  try {
    const { catagoryId } = req.params;
    const catagories = await Catagory.findByIdAndUpdate(
      catagoryId,
      { ...req.body },
      { new: true },
      { runValidator: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        catagories,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteCatagory = async (req, res, next) => {
  try {
    const { catagoryId } = req.params;
    await Catagory.findByIdAndDelete(catagoryId);
    res.status(200).json({
      status: "success",
      message: "Catagory deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
