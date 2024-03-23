const router = require("express").Router();
const {
  createBlogCategory,
  getBlogCategories,
  updateBlogCategories,
  deleteBlogCategories,
} = require("../controllers/blogCategory");
const { verifyAccessToken, isAdmin } = require("../middlewares/vetifyToken");

router.post("/", [verifyAccessToken, isAdmin], createBlogCategory);
router.get("/", [verifyAccessToken, isAdmin], getBlogCategories);
router.patch("/:cid", [verifyAccessToken, isAdmin], updateBlogCategories);
router.delete("/:cid", [verifyAccessToken, isAdmin], deleteBlogCategories);

module.exports = router;
