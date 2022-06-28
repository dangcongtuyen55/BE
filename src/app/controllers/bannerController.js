const Banner = require("../models/Banner");

exports.getAllBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find()
      .populate("createBy", "name")
      .select("title banner_url");
    res.status(200).json({
      status: "success",
      results: banners.length,
      banners,
    });
  } catch (error) {
    next(error);
    // res.json(error);
  }
};

exports.createBanner = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const banners = await Banner.create({
      ...req.body,
      createBy: userId,
    });
    res.status(200).json({
      status: "success",
      data: {
        banners,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBanner = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    console.log(req.params);
    const banners = await Banner.findByIdAndUpdate(
      id,
      { ...req.body, updateBy: userId, slug: slugify(req.body.name) },
      { new: true, runValidator: true }
    );
    console.log(banners);
    res.status(200).json({
      status: "success",
      data: {
        banners,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteBanner = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    await banner.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: "Banner deleted successfully",
      deleteBy: userId,
    });
  } catch (error) {
    next(error);
  }
};
