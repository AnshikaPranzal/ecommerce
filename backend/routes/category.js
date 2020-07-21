var express = require('express')
var router = express.Router()

const { isAdmin,isAuthenticated,isSignedIn } = require("../controllers/auth")
const { getCategoryById, createCategory ,getCategory,getAllCategory,updateCategory,removeCategory} = require("../controllers/category")
const { getUserById } = require("../controllers/user")

//params
router.param("userId", getUserById); //automatic before checks
router.param("categoryId", getCategoryById); //automatic before checks

//actual routes

//create
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory) //order of the controllers is very important

//read
router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategory);

//update
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory);
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,removeCategory);


module.exports = router;