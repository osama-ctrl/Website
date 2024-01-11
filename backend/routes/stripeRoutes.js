const express = require("express");

const { isAuthenticatedUser } = require("../middleware/auth");
const {payment } = require("../controllers/stripePayment");
const router = express.Router();


router.route("/payment").post(payment)


module.exports = router;
