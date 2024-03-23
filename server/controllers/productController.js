const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugifly = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing Values");
  if (req.body && req.body.title) req.body.slug = slugifly(req.body.title);

  const newProduct = await Product.create(req.body);

  return res.status(200).json({
    success: newProduct ? true : false,
    createProduct: newProduct ? newProduct : "create fail!",
  });
});

const getProductById = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid);

  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : "Cannot get product",
  });
});

const getProducts = asyncHandler(async (req, res) => {
  const queries = { ...req.query };

  // tách các trường đặc biệt ra khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // format lại các operator cho đúng cú pháp mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  const formatedQueries = JSON.parse(queryString);

  //filtering
  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };

  let queryCommand = Product.find(formatedQueries);
  //sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  //field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  //pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;

  queryCommand.skip(skip).limit(limit);

  // execute query
  // số lượng sp thỏa mản điều kiên != số lượng sp trả về 1 lần gọi api
  try {
    const response = await queryCommand.exec();
    const counts = await Product.countDocuments(formatedQueries);
    return res.status(200).json({
      success: response ? true : false,
      pagination: {
        totalRecord: counts,
        pageSize: limit,
        pageIndex: page,
      },
      products: response ? response : "cannot get products",
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugifly(req.body.title);
  const updatedProduct = await Product.findByIdAndDelete(pid, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: updatedProduct ? true : false,
    updatedProduct: updatedProduct ? updatedProduct : "Cannot update product",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deletedProduct ? true : false,
    deletedProduct: deletedProduct ? deletedProduct : "Cannot delete product",
  });
});

const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid } = req.body;
  if ((!star, !pid)) throw new Error("Missing values");
  const ratingProduct = await Product.findById(pid);
  const alreadyRating = ratingProduct?.ratings?.find(
    (el) => el.postedBy.toString() === _id
  );

  if (alreadyRating) {
    await Product.updateOne(
      {
        ratings: { $elemMatch: alreadyRating },
      },
      {
        $set: { "ratings.$.star": star, "ratings.$.comment": comment },
      },
      { new: true }
    );
  } else {
    await Product.findByIdAndUpdate(
      pid,
      {
        $push: { ratings: { star, comment, postedBy: _id } },
      },
      { new: true }
    );
  }

  //sum ratings
  const updateProduct = await Product.findById(pid);
  const ratingCount = updateProduct.ratings.length;
  const sumRatings = updateProduct.ratings.reduce(
    (sum, el) => sum + +el.star,
    0
  );
  updateProduct.totalRatings = Math.round((sumRatings * 10) / ratingCount) / 10;
  await updateProduct.save();

  return res.status(200).json({
    success: true,
    msg: "successfully!",
    updateProduct: updateProduct,
  });
});

module.exports = {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
  ratings,
};
