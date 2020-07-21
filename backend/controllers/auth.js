const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expJwt = require('express-jwt');

exports.signout = (req, res)=>{
    res.clearCookie("token");
    res.json({
        msg: "Signed out bro"
    });
}

exports.signin = (req, res)=>{

    const { email,password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ 
          erroris: errors.array()[0].msg ,
          errorin: errors.array()[0].param
    });
    }
 User.findOne({email},(err,user)=>{
     if(err || !user){
         return res.status(400).json({
             erroris: "No such email I know"
         })
     }
     if(!user.authenticate(password)){
        return res.status(401).json({
            erroris: "Email and password are not same"
        })
     }
     //token creation
     var token = jwt.sign({ _id: user._id }, "ihateyou");
     //put the token in cookie
     res.cookie("token", { expire: new Date() + 99999 });

     //send response to frontend
     const { _id,name, email, role} = user;
     return res.json({
         token,
         user: {_id,name, email, role}
     })

 })
};

exports.signup = (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ 
          erroris: errors.array()[0].msg ,
          errorin: errors.array()[0].param
    });
    }

    const user = User(req.body);
    user.save((err, user) =>{
        if(err){
          return res.status(400).json({
              err: "Unable to save.."
          })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    })
};

//protected routes
exports.isSignedIn = expJwt({
    secret: "ihateyou",
    userProperty: "auth"
});
//custom 
exports.isAuthenticated = (req, res, next)=>{
 
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
}

exports.isAdmin = (req, res, next)=>{
    if(req.profile.role === 0){
        res.status(403).json({
            error: "Only for admins"
        });
    }
    next();
}