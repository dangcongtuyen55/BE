const Banner = require("../models/Banner");

exports.getAllBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find()
      .populate("createBy", "name")
      .select("title banner_url isDeleted");
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

exports.getBannerDetail = async (req, res, next) => {
  try {
    // const id = req.params.id;
    const { id } = req.params;
    console.log(id);
    const banner = await Banner.findById(id);
    res.status(200).json({
      success: true,
      banner,
    });
  } catch (error) {
    next(error);
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
      { ...req.body, updateBy: userId },
      { new: true, runValidator: true }
    );
    console.log(banners);
    res.status(200).json({
      status: "success",
      data: {
        banners,
      },
    });
    console.log(banners);
  } catch (error) {
    next(error);
  }
};
// exports.deleteBanner = async (req, res, next) => {
//   try {
//     const { userId } = req.user;
//     const { id } = req.params;
//     await banner.findByIdAndDelete(id);
//     res.status(200).json({
//       status: "success",
//       message: "Banner deleted successfully",
//       deleteBy: userId,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

exports.deleteOneBanner = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    await Banner.findByIdAndUpdate(id, { isDeleted: true });
    res.status(200).json({
      status: "success",
      message: "Banner deleted successfully",
      deleteBy: userId,
    });
  } catch (error) {
    next(error);
  }
};

exports.restoreOneBanner = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    // await Product.findByIdAndUpdate(id, { isDeleted: false });
    const banners = await Banner.findByIdAndUpdate(id, {
      ...req.body,
      restoreBy: userId,
      isDeleted: false,
    });
    res.status(200).json({
      status: "success",
      message: "Banner restore successfully",
      banners,
    });
  } catch (error) {
    next(error);
  }
};
