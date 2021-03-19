const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const Config=require('../config/config');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:true,
        min:7,
        max:40
    },
    hash_password:{
        type:String,
        required:true,
    },

},{timestamps:true, versionKey:false});

userSchema.methods = {
    authenticate: async function (password) {
      return await bcrypt.compareSync(password, this.hash_password);
    },
 generatetoken:function(){
     let token= jwt.sign({_id:this._id,name:this.name},Config.privateKey);
     return token;
 }
  };
  

module.exports = mongoose.model('User',userSchema);