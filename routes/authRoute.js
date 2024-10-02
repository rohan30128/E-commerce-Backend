const { Router } = require("express");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");
const {
  registerController,
  loginController,
  forgetPasswordController,
  updateProfileController,
  getOrderController,
  getAllOrderController,
  orderStatusController,
} = require("../controllers/authController");

const router = Router();

//Registe router
router.post("/register", registerController);
//Login router
router.post("/login", loginController);

//Forget password
router.post("/forgot-password", forgetPasswordController);

//protected user route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected admin route
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put("/profile",requireSignIn,updateProfileController);

//orders 
router.get("/orders",requireSignIn,getOrderController);

// all orders 
router.get("/all-orders",requireSignIn,isAdmin,getAllOrderController);

// order status update 
router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController);

module.exports = router;
