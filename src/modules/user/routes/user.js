const express = require("express");
const router = express.Router();

const userController= require('../controller/userController');
const categoryController= require('../controller/categoryController');
const subCategoryController= require('../controller/subCategoryController');
const productController= require('../controller/productController');
const cartController= require('../controller/cartController');
const wishlist = require('../controller/wishlistController');
const addressController = require('../controller/addressController');
const orderController = require('../controller/orderController');
const otpController = require('../controller/otpController');
const couponController = require('../controller/couponController');
//home Page and Login Page
router.get("/", userController.getHome);
router.get("/login", userController.getLogin);
router.post("/userLogin", userController.postLogin);
router.get("/register", userController.getRegister);
router.post("/userRegister", userController.postRegister);
router.get("/logout", userController.getLogout);
router.get("/userProfile",userController.getUserProfile)
router.post("/updateUser",userController.updateUser)

//categoryController
router.get("/getCategoryList", categoryController.getCategoryList);

//subCategoryController
router.get("/getSubCategoryList", subCategoryController.getSubCategoryList);

//productController
router.get("/getProductList", productController.getProductList);
router.get("/getSubProductList", productController.getSubProductList);
router.get("/getSingleProductView", productController.getSingleProductView);

//cartController
router.post("/addCart", cartController.addCart);
router.get("/getCart", cartController.getCart);
router.get("/deleteCart", cartController.deleteCart);
router.get("/addCount", cartController.addCount);
router.get("/subCount", cartController.subCount);

//wishlistController
router.post("/addWishlist", wishlist.addWishlist);
router.get("/getWishlist", wishlist.getWishlist);
router.get("/deleteWishlist", wishlist.deleteWishlist);


// addressController
router.get("/getAddressPage",addressController.getAddressPage);
router.post("/saveAddress",addressController.saveAddress);
router.get("/getAddress",addressController.getAddress);

//orderController
router.get("/getCheckOut", orderController.getCheckOut);
router.post("/saveOrder", orderController.saveOrder);
router.get("/getAllOrder",orderController.getAllOrder);
router.get("/getOrder",orderController.getOrder);
router.get("/deleteOrder",orderController.deleteOrder);
router.post("/verifyPayment",orderController.verifyPayment);
router.get("/getInvoice",orderController.getInvoice);

//otpController
router.post("/getOtp", otpController.getOtp);
router.post("/verifyOtp", otpController.verifyOtp);

//couponController
router.get("/getCoupon", couponController.getCoupon);
router.get("/getAllCoupons", couponController.getAllCoupons);
router.post("/applayedUserStatus",couponController.applayedUserStatus)
module.exports = router;