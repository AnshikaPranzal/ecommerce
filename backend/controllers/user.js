const User = require("../models/user");
const Order = require("../models/order");
exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user)=>{      //all the callbacks here will have parameters as error and the obj itself if found
        if(err || !user){
            return res.status(400).json({
                error: "No such user exists"
            })
        }
        req.profile = user;
        next();
    })
}

exports.getUser = (req, res) => {
    //Get back here for password
    req.profile.salt = undefined;
    req.profile.encryptedpassword = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}

exports.updatedUser = (req, res) =>{
    User.findByIdAndUpdate({_id: req.profile._id},
        {$set: req.body},
        {new: true,useFindAndModify: false},
        (err,user) => {
            if(err){
                return res.status(400).json({
                    error: "Updating not authorized"
                })
            }
            req.profile.salt = undefined;
            req.profile.encryptedpassword = undefined;
            req.profile.createdAt = undefined;
            req.profile.updatedAt = undefined;
            res.json(user);
        }
        );
}
exports.userPurchaseList = ( req,res )=>{
    Order.find({user: req.profile._id}).populate("user", "_id name")
    .exec((err, order) =>{
        if(err){
            return res.status(400).json({
                error: "No order for this user"
            })
        }
        return res.json(order);
    });
}

exports.pushOrderInPurchaseList = (req,res,next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: re.body.order.amount,
            transaction_id: re.body.order.transaction_id,
        })
    });
    //store this in db
    User.findOneAndUpdate({user: req.profile._id},
        {$push:{purchases: purchases}},
    {new: true},                         //new is set to true that means it will send updated object and not the old one    
    (err,puchases)  =>{
        if(err){
            return res.status(400).json({
                error: "Unable to save the purchase Listtt"
            });
            next();
        }
    }
    )
   
}