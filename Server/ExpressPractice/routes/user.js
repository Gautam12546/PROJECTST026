const express = require('express')
const router = express.Router()
const { createUser, signin, verifyEmail, forgotPassword, resetPassword } = require("../controllers/user");
const { validateUser, validate } = require('../middlewares/validator');
const { isResetTokenValid } = require('../middlewares/user');




router.post("/register", validateUser, validate, createUser);
router.post("/signin", signin);
router.post("/otp", verifyEmail);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", isResetTokenValid, resetPassword);


module.exports = router