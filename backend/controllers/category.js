const Cat = require("../models/category");

exports.getCategoryById = (req, res, next, id) =>{
    Cat.findById(id).exec((err,cat)=>{
        if(err || !cat){
            return res.status(400).json({
                error: "Category not found"
            })
        }
        req.category = cat;
        next();
    })
    
}
exports.createCategory = (req,res) =>{
    const category = new Cat(req.body);
    category.save((err,category) => {
        if(err || !category){
            return res.status(400).json({
                error: "Category not saved"
            })
        }
        res.json({category})
    })
}

exports.getAllCategory = (req,res) =>{
    Cat.find().exec((err,cat)=>{
        if(err || !cat){
            return res.status(400).json({
                error: "Category doesn't exist"
            })
        }
        res.json(cat);
    })
}

exports.getCategory = (req,res) =>{
    console.log(req.category);
    return res.json(req.category);

}

exports.updateCategory = (req,res) =>{
    const category = req.category;
    category.name = req.body.name;

    category.save((err,updatedCategory) => {
        if(err || !updatedCategory){
            return res.status(400).json({
                error: "Category not saved"
            })
        }
       res.json(updatedCategory)
    })
}

exports.removeCategory = (req,res) =>{
    const category = req.category;
    category.remove((err,cat)=>{
        if(err){
            return res.status(400).json({
                error: "Failed to delete category"
            })
        }
        res.json({
            message: cat.name + " deleted"
        });
        }
    )
}
