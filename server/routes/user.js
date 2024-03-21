const router = require("express").Router();
const {
  register,
  login,
  getMe,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getAllUser,
  deleteUser,
  updateUser,
  updateUserByAdmin,
} = require("../controllers/userController");
const { verifyAccessToken, isAdmin } = require("../middlewares/vetifyToken");

router.post("/register", register);
router.post("/login", login);
router.get("/", verifyAccessToken, getMe);
router.post("/refreshToken", refreshAccessToken);
router.get("/logout", logout);
router.get("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);
router.get("/getAllUser", [verifyAccessToken, isAdmin], getAllUser);
router.delete("/", [verifyAccessToken, isAdmin], deleteUser);
router.put("/update", verifyAccessToken, updateUser);
router.put("/:uid", [verifyAccessToken, isAdmin], updateUserByAdmin);

module.exports = router;
