var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var { ObjectId } = Schema;

var ProductCartSchema = new Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number,
});

const ProductCart = mongoose.model("ProductCart",ProductCartSchema);

var orderSchema = new Schema({
    products: [ProductCartSchema],
    transactionid: {},
    address: String,
    amount:{
        type: Number
    },
    status: {
        type: String,
        default: "Received",
        enum: ["Cancelled","Dellivered","Shipped","Processing","Received"]
    },
    update: Date,
    user:{
        type: ObjectId,
        ref: "User",
    }
    
},{timestamps: true});

const Order = mongoose.model("Order",orderSchema);

module.exports = {Order, ProductCart}