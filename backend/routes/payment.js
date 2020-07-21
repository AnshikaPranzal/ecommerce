var express = require('express')
var router = express.Router()

const { getUserById} = require("../controllers/user")
const { isAdmin,isAuthenticated,isSignedIn } = require("../controllers/auth")
const { getToken,processPayment } = require("../controllers/payment")

router.param("userId", getUserById); //automatic before checks

router.get("/payment/getToken/:userId",isSignedIn,isAuthenticated,getToken);
router.post("/payment/braintree/:userId",isSignedIn,isAuthenticated,processPayment);



module.exports = router;