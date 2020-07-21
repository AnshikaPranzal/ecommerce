var express = require('express')
var router = express.Router();

const { isAdmin,isSignedIn,isAuthenticated} = require("../controllers/auth")
const { getProductById,createProduct,getProduct,photo,removeProduct,getAllProducts,updateProduct,getAllUniqueCategories } = require("../controllers/product")
const { getUserById } = require("../controllers/user")


router.param("userId", getUserById);
router.param("productId", getProductById); 

//create route
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct) 

//read routes
router.get("/product/:productId",getProduct) 
router.get("/product/photo/:productId",photo) 

//delete
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,removeProduct);

//update
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct);

//listing routes
router.get("/product",getAllProducts)

router.get("/products/categories",getAllUniqueCategories)


module.exports = router;


