const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");
const { addToCart , getProductsByUserId, updateQuantity, deleteProductFromCart ,processPayment , confirmPayment, getCart, quantity, checkProductStock} = require('../controllers/cartController');

// Define a route to add a product
router.post('/addToCart',addToCart );

router.get("/getProducts/:userId" , getProductsByUserId)
router.put("/updateQuantity/:userId/:productId" , updateQuantity)
.delete('/deleteProduct/:userId/:productId' ,deleteProductFromCart)
router.post("/create-payment-intent" ,processPayment   )



module.exports = router;
