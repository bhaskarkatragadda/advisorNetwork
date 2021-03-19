const mongoose = require('mongoose');

const advisorScheme  = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20,
    },
    photoUrl:{
        type:String,
        required:true
    }
},{versionKey:false});



module.exports = mongoose.model('Advisor', advisorScheme);