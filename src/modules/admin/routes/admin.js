const express = require("express");
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination:"public/uploadImage",
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null,Date.now()+file.originalname);
  },
});

const upload =multer({
  storage
})

const adminController= require('../controller/adminController');
const productController = require('../controller/productController');
const categoryController = require('../controller/categoryController');
const subCategoryController = require('../controller/subCategoryController');
const sizeController = require('../controller/sizeController');
const quantityController = require('../controller/quantityController');
const userController = require('../controller/userController');
const orderController = require('../controller/orderController');
const orderStatusController = require('../controller/orderStatusController');
const couponController = require('../controller/couponController');

//home Page and Login Page
router.get("/", adminController.getLogin);
router.post("/login", adminController.postLogin);
router.get("/home", adminController.getHome);
router.get("/logout", adminController.getLogout);

//productController
router.get("/productDetails", productController.getDeatailsPage);
router.get("/productList", productController.getProductList);
router.get("/getProduct", productController.getProduct);
router.post("/product",upload.array("image",10), productController.saveProduct);
router.get("/deleteProduct", productController.deleteProduct);
router.get("/productStatusChange", productController.status);
router.get("/getData", productController.getData);

//categoryController
router.get("/categoryDetails", categoryController.getDeatailsPage);
router.get("/categoryList", categoryController.getCategoryList);
router.get("/getCategory", categoryController.getCategory);
router.post("/category",upload.array("image",10), categoryController.saveCategory);
router.get("/deleteCategory", categoryController.deleteCategory);
router.get("/categoryStatusChange", categoryController.status);

//subCategoryController
router.get("/subCategoryDetails", subCategoryController.getDeatailsPage);
router.get("/subCategoryList", subCategoryController.getSubCategoryList);
router.get("/getSubCategory", subCategoryController.getSubCategory);
router.post("/subCategory",upload.array("image",10), subCategoryController.saveSubCategory);
router.get("/deleteSubCategory", subCategoryController.deleteSubCategory);

//sizeController
router.get("/sizeDetails", sizeController.getDeatailsPage);
router.get("/sizeList", sizeController.getSizeList);
router.get("/getSize", sizeController.getSize);
router.post("/size", sizeController.saveSize);
router.get("/deleteSize", sizeController.deleteSize);

//quantityController
router.get("/quantityList", quantityController.getQuantityList);
router.post("/quantity", quantityController.saveQuantity);
router.get("/deleteQuantity", quantityController.deleteQuantity);

//categoryController
router.get("/userList", userController.getUserList);
router.get("/getUser", userController.getUser);
router.post("/user", userController.saveUser);
router.get("/deleteUser", userController.deleteUser);
router.get("/userStatusChange", userController.status);

//orderController
router.get("/getOrder",orderController.getOrder);
router.get("/getSingleOrder",orderController.getSingleOrder);
router.get("/getAllOrder",orderController.getAllOrder);
router.post("/changeOrderStatus",orderController.changeOrderStatus);

//orderStatusController
router.post("/getOrderStatus",orderStatusController.getOrderStatus);
router.get("/getAllOrderStatus",orderStatusController.getAllOrderStatus);
router.post("/saveOrderStatus",orderStatusController.saveOrderStatus);
router.get("/deleteOrderStatus",orderStatusController.deleteOrderStatus);

//couponController addCoupon
router.post("/saveCoupon",couponController.saveCoupon);
router.get("/getAllCoupon",couponController.getAllCoupon);
router.get("/getCouponDetails",couponController.getCouponDetails);
router.get("/deleteCoupon",couponController.deleteCoupon);
module.exports = router;

