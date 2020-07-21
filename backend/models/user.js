var mongoose = require('mongoose');
const crypto = require('crypto'); 
const { v1: uuidv1 } = require('uuid');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name:{
      type: String,
      require: true,
      maxlength: 40,
      trim: true,
  },
  lastname:{
    type: String,
    maxlength: 40,
    trim: true
},
 email:{
    type: String,
    require: true,
    trim: true,
    unique: true
},
userinfo:{
    type: String,
    trim: true,
},
encryptedpassword:{
    type: String,
    require: true,
    
},
salt: String,
role:{
    type: Number,
    default: 0
},
purchase:{
    type: Array,
    default: []
}
},{timestamps: true});

userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv1();
        this.encryptedpassword = this.passwordencrypter(password);
    })
    .get(function(){
        return this._password;
    })

userSchema.methods = {

    authenticate: function(justpassword){
        return this.passwordencrypter(justpassword) === this.encryptedpassword;
    },

    passwordencrypter: function(justpassword)
    {
        if(!justpassword) return "";
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(justpassword)
            .digest('hex');
        }
        catch{
            return "";
        }
    }

}

module.exports = mongoose.model("User",userSchema);