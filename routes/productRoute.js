const { Router } = require("express");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");
const {
  createProductController,
  getProductController,
  getSingleProduct,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  getProductByCategory,
  braintreeTokenController,
  braintreePaymentController,
} = require("../controllers/productController");
const formidable = require("express-formidable");

const router = Router();

//create product routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get Products
router.get("/get-product", getProductController);

//single products
router.get("/get-product/:slug", getSingleProduct);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/product/:pid", requireSignIn, isAdmin, deleteProductController);

//filter products
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search procuct
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid",relatedProductController);

//category wise product 
router.get("/product-category/:slug",getProductByCategory) ;

//payment route 
//token
router.get("/braintree/token",braintreeTokenController);

//payments
router.post("/braintree/payment",requireSignIn,braintreePaymentController);

module.exports = router;
