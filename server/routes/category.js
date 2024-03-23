const router = require("express").Router();
const {
  createCategory,
  getCategories,
  updateCategories,
  deleteCategories,
} = require("../controllers/productCategory");
const { verifyAccessToken, isAdmin } = require("../middlewares/vetifyToken");

router.post("/", [verifyAccessToken, isAdmin], createCategory);
router.get("/", [verifyAccessToken, isAdmin], getCategories);
router.patch("/:cid", [verifyAccessToken, isAdmin], updateCategories);
router.delete("/:cid", [verifyAccessToken, isAdmin], deleteCategories);

module.exports = router;
