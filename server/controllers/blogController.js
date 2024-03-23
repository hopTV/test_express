const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");

const createNewBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if ((!title, !description, !category)) throw new Error("Missing values");

  const response = await Blog.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
  });
});

module.exports = {
  createNewBlog,
};
