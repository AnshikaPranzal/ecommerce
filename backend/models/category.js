var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name:{
        type: String,
        require: true,
        maxlength: 40,
        trim: true,
        unique: true
    }
},{timestamps: true});

module.exports = mongoose.model("Category", categorySchema);