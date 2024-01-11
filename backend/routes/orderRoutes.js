const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");
const { newOrder, getSingleOrder, myOrder, getAllOrder, updateOrder, deleteOrder} = require("../controllers/orderController");

router.route("/order/new").post(isAuthenticatedUser ,newOrder)


router.route("/orders/myorder").get(isAuthenticatedUser ,  myOrder)
router.route("/orders/:id").get(isAuthenticatedUser ,  getSingleOrder)
router.route('/admin/orders').get(isAuthenticatedUser , authorizedRole("admin") , getAllOrder)
router.route("/admin/orders/:id").put(isAuthenticatedUser, authorizedRole("admin") , updateOrder).delete(isAuthenticatedUser , authorizedRole("admin") ,  deleteOrder)
module.exports = router;