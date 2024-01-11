const express = require("express");
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetail , getStockQuantity} = require("../controllers/productController");
const {  authorizedRole, isAuthenticatedUser } = require("../middleware/auth");
const upload = require("../config/multerConfig")

const router = express.Router();

router.route("/products").get( getAllProducts)
router.route("/new/product").post(isAuthenticatedUser , authorizedRole("admin") , upload.single("image") , createProduct)
router.route("/product/:id").put(isAuthenticatedUser , authorizedRole("admin") , updateProduct)
.delete(isAuthenticatedUser , authorizedRole("admin") , deleteProduct)
.get(getProductDetail)

router.get('/products/:productId' , getStockQuantity);

module.exports = router;