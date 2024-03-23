const router = require("express").Router();
const { createNewBlog } = require("../controllers/blogController");
const { verifyAccessToken, isAdmin } = require("../middlewares/vetifyToken");

router.post("/", [verifyAccessToken, isAdmin], createNewBlog);

module.exports = router;
