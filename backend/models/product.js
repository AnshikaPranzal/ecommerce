var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {ObjectId}= Schema;
var productSchema = new Schema({
    name:{
        type: String,
        require: true,
        maxlength: 40,
        trim: true,
    },
    description:{
        type: String,
        require: true,
        maxlength: 2000,
        trim: true,
    },
    price:{
        type: Number,
        require: true,
        maxlength: 40,
        trim: true
    },
    category:{
        type: ObjectId,
        ref: "Category",
        require: true,
    },
    stock:{
        type: Number
    },
    sold:{
        type: Number
    },
    photo:{
        data: Buffer,
        contentType: String
    }
    
},{timestamps: true});

module.exports = mongoose.model("Product",productSchema);