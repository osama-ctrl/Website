const express = require("express");
const { registeruser, loginUser, logoutUser , forgetPassword } = require("../controllers/userController");
const upload = require("../config/multerConfig")
const router = express.Router();




router.route('/registeruser').post(upload.single('avatar'), registeruser);
router.route("/loginuser").post(loginUser)
router.route("/logoutuser").post(logoutUser)
router.route('/password/forgot').post(forgetPassword)




module.exports = router;