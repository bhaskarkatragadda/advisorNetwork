const winston=require('winston');
const mongoose=require('mongoose');



module.exports=function(){
    mongoose.connect('mongodb+srv://admin:krishna@1729@flip-kart-clone.ixvgu.mongodb.net/nurtureLab?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(()=>winston.info("connected to database"));
}