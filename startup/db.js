const winston=require('winston');
const mongoose=require('mongoose');



module.exports=function(){
    mongoose.connect('mongodb://localhost:27017/advisor', {useNewUrlParser: true})
    .then(()=>winston.info("connected to database"));
}