const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  if (!req.body.title) throw new Error("Missing values");
  const response = await ProductCategory.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : "cannot create category",
  });
});

const getCategories = asyncHandler(async (req, res) => {
  const response = await ProductCategory.find().select("title", "_id");
  return res.status(200).json({
    success: response ? true : false,
    data: response,
  });
});

const updateCategories = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const response = await ProductCategory.findByIdAndUpdate(cid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    data: response,
  });
});

const deleteCategories = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const response = await ProductCategory.findByIdAndDelete(cid);
  return res.status(200).json({
    success: response ? true : false,
    data: response,
  });
});

module.exports = {
  createCategory,
  getCategories,
  updateCategories,
  deleteCategories,
};
