var express = require('express')
const { check, validationResult } = require('express-validator');


var router = express.Router()
const { signout,signup,signin,isSignedIn } = require("../controllers/auth")

router.post("/signup",[
    check('name', "hitesh way for name").isLength({min:3}),
    check('email', "hitesh way for email").isEmail(),
    check('password', "hitesh way for password").isLength({min:3})
], signup);

router.post("/signin",[
    check('email', "email field is required").isEmail(),
    check('password', "password field is required").isLength({min:3})
], signin);

router.get("/signout", signout);

router.get("/test", isSignedIn, (req,res) =>{
    res.json(req.auth);
});

module.exports = router;