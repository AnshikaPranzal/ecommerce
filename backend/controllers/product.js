const Product = require("../models/product");
const formidable = require('formidable')
const _ = require("lodash") //we use _ when we need to declare a private variable but not going to use too much of it
const fs = require("fs")  //present by default in node no need to install

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("Product")
    .exec((err, product)=>{      //all the callbacks here will have parameters as error and the obj itself if found
        if(err || !product){
            return res.status(400).json({
                error: "No such Product exists"
            })
        }
        req.product = product;
        next();
    })
}

exports.createProduct = (req,res) =>{

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:  "Image has a problem"
            })
        }
        //destructure the field
        const {price,name,description,category,stock} = fields; //basically price=fields.price is executing here.

        if(
            !price ||
            !name ||
            !description ||
            !category ||
            !stock
        ){
            
                return res.status(400).json({
                    error: "Fields are missing"
                }) 
        
    }

        //handle file here 
        let product = new Product(fields);
        if(file.photo){
        if(file.photo.size >3000000 ) //3mb
        {
            return res.status(400).json({
                error: "File size exceeded"
            })
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
    }

    product.save((err,produc) => {
        if(err){
            return res.status(400).json({
                error: err + "Tshirt not saved"
            })
        }
        res.json({produc})
    })
    });
}

exports.getProduct = (req,res) =>{
    req.product.photo = undefined;
    return res.json(req.product)
}

//middleware
exports.photo = (req,res,next) => {
    
    if(req.product.photo.data){
        console.log("hi")
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data);
    }
    next();
};

exports.removeProduct = (req,res) =>{
    const product = req.product;
    product.remove((err,product)=>{
        if(err){
            return res.status(400).json({
                error: "Failed to delete product"
            })
        }
        res.json({
            message: product.name + " deleted"
        });
        }
    )
}

exports.updateProduct = (req,res) =>{

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error: "Image has a problem"
            })
        }
        //destructure the field
        

        //updation code 
        let product = req.product;
        product = _.extend(product,fields)

        if(file.photo){
        if(file.photo.size >3000000 ) //3mb
        {
            return res.status(400).json({
                error: "File size exceeded"
            })
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
    }

    product.save((err,produc) => {
        if(err){
            return res.status(400).json({
                error: "Tshirt not updated"
            })
        }
        res.json({produc})
    })
    });
}

//product listing
exports.getAllProducts = (req,res) =>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err,product) => {
        if(err){
            return res.status(400).json({
                error: "No products here..."
            })
        }
        
        res.json(product);
    })
}

exports.getAllUniqueCategories = (req,res) =>{
    Product.distinct("category",{},(err,category)=>{
        if(err){
            return res.status(400).json({
                error: "No categories found.."
            })
        }
        res.json(category)
    })
}

exports.updateStock = (req,res,next) =>{

    let myOperation = req.body.order.products.map(prod =>{
        return {
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count,sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperation, {},(err,product)=>{
        if(err){
            return res.status(400).json({
                error: "Bulk Ops failed"
            })
        }
    })
    next();
}