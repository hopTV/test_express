const router = require("express").Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  ratings,
} = require("../controllers/productController");
const { verifyAccessToken, isAdmin } = require("../middlewares/vetifyToken");

router.post("/", createProduct);
router.get("/", getProducts);
router.put("/ratings", verifyAccessToken, ratings);

router.put("/:pid", [verifyAccessToken, isAdmin], updateProduct);
router.delete("/:pid", [verifyAccessToken, isAdmin], deleteProduct);
router.get("/:pid", getProductById);

module.exports = router;
