var express = require('express')
var router = express.Router();
const { getUserById,getUser,updatedUser,userPurchaseList} = require("../controllers/user")
const { isAdmin,isSignedIn,isAuthenticated} = require("../controllers/auth")

router.param("userId", getUserById); //automatic before checks

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);
router.put("/user/:userId",isSignedIn,isAuthenticated,updatedUser);
router.get("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchaseList);
module.exports = router;