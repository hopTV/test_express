const blogCategory = require("../models/blogCategory");
const asyncHandler = require("express-async-handler");

const createBlogCategory = asyncHandler(async (req, res) => {
  if (!req.body.title) throw new Error("Missing values");
  const response = await blogCategory.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : "cannot create category",
  });
});

const getBlogCategories = asyncHandler(async (req, res) => {
  const response = await blogCategory.find().select("title", "_id");
  return res.status(200).json({
    success: response ? true : false,
    data: response,
  });
});

const updateBlogCategories = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const response = await blogCategory.findByIdAndUpdate(cid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    data: response,
  });
});

const deleteBlogCategories = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const response = await blogCategory.findByIdAndDelete(cid);
  return res.status(200).json({
    success: response ? true : false,
    data: response,
  });
});

module.exports = {
  createBlogCategory,
  getBlogCategories,
  updateBlogCategories,
  deleteBlogCategories,
};
