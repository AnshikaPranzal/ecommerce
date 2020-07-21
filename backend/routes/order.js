var express = require('express')
var router = express.Router()

const { isAdmin,isAuthenticated,isSignedIn } = require("../controllers/auth")
const { getUserById,pushOrderInPurchaseList } = require("../controllers/user")
const { getOrderById,createOrder,getAllOrders,getOrderStatus,updateOrders } = require("../controllers/order")
const { updateStock } = require("../controllers/product")

//pa
router.param("userId", getUserById); //automatic before checks
router.param("orderId", getOrderById); //automatic before checks

router.post("/order/create/:userId",isSignedIn,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder);

router.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrders)
 
//status
router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus)
router.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateOrders)


module.exports = router;