const {Order, ProductCart} = require("../models/order");

exports.getOrderById = (req, res, next, id) =>{
    Order.findById(id)
    .populate("products.product","name price")
    .exec((err,order)=>{
        if(err || !order){
            return res.status(400).json({
                error: "Order not found"
            })
        }
        req.order = order;
    })
    next();
}

exports.createOrder = (req,res) =>{
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err,order)=>{
        if(err || !order){
            return res.status(400).json({
                error: "Order not saved in Db"
            })
        }
        res.json(order);
    });
}

exports.getAllOrders = (req,res) =>{
    Order.find()
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err || !order){
            return res.status(400).json({
                error: "Orders not found in Db"
            })
        }
        res.json(order);
    });
}

exports.getOrderStatus = (req,res) =>{
    res.json(Order.schema.path("status").enumValues);
}

exports.updateOrders = (req,res) =>{
    Order.update(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err,order)=>{
        if(err || !order){
            return res.status(400).json({
                error: "Orders not updated"
            })
        }
        res.json(order);
    });
}