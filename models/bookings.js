const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    advisorId:{
        type:mongoose.Types.ObjectId,
        ref:'Advisor',
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    bookingTime:{
        type:Date,
        required:true
    }
},{timestamps:true,versionKey:false});

module.exports = mongoose.model('Booking',bookingSchema);