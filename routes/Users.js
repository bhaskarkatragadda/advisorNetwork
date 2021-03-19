const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Advisor = require('../models/advisor');
const Booking = require('../models/bookings');
const  Mongoose  = require('mongoose');
const validator = require('../middleware/validator');


router.post('/signin', async (req,res) =>{
    try{
               const userObj =  await User.findOne({email:req.body.email});
               if(userObj){
                   const isPassword = await userObj.authenticate(req.body.password);
                   
                   if(isPassword){
                       let token=userObj.generatetoken();
                       return res.status(200).json({
                           messgage:"login successful",
                           JWT_token:token,
                           userId:userObj._id
                       })
                   }else{
                       return res.status(400).json({
                           messgage:"Password invalid"
                       })
                   }
               }
    }catch(e){
            return res.status(400).json({
                messgage:"Somethin went wrong"
            })
    }
})

router.post('/register', async (req,res) =>{
    try{
            let user_obj =  await User.findOne({email:req.body.email});
            if(user_obj){
                return res.status(400).json({
                    message:'User already registerd'
                });
            }
                // const { name, email, password } = req.body;
                const hash_password = await bcrypt.hash(req.body.password,10);
                const newUser = new User({ name:req.body.name, email:req.body.email,  hash_password: hash_password });
                const result = await newUser.save();
                if(result){
                    let token=result.generatetoken();
                    return res.status(200).json({
                        messgage:'Successfully registered',
                       JWT_token:token,
                       userId:result._id
                    });
                }else{
                    return res.status(400).json({
                        messgage:'Something went wrong'
                    });
                }
            
    }catch(e){
            return res.status(400).json({
                messgage:'Something went wrong'
            });
    }
});


router.get('/:userId/advisor', async (req,res) => {
    const advisor =  await Advisor.find();
    if(advisor.length !=0){
        return res.status(200).json({
                advisor
        });
    }else{
        return res.status(204).json({
            message:"No advisors found"
        });
    }
});

router.post('/:userId/advisor/:advisorId', async (req,res) => {
        const userId = req.params.userId;
        const advisorId = req.params.advisorId;
        if(validator(userId) && validator(advisorId)){ 
                const isUser = await User.count({_id:userId});
                const isAdvisor = await Advisor.count({_id:advisorId});
                if( isUser && isAdvisor){
                    const booking  = new Booking({userId:userId,advisorId:advisorId,bookingTime:req.body.bookingTime});
                    const result = await booking.save();
                    return res.status(200).json({
                        message:"Booking Successful"
                    })
                } else{
                    return res.status(404).json({
                        message:"UserId or AdvisorId are Invalid"
                    })
                }
        }
});

router.get('/:userId/advisor/booking', async (req,res) => {
            const userId = req.params.userId;
            if(validator(userId)){
                const data = await Booking.find({userId:userId}).populate('advisorId');
                console.log(data);
                let arr = new Array();
                data.forEach( async (element) =>{
                   let a = {
                       advisorId: element.advisorId._id,
                       advisorName:element.advisorId.name,
                       advisorProfilelUrl: element.advisorId.photoUrl,
                       bookingId:element._id,
                       bookingTime:element.bookingTime
                   };
                   arr.push(a);
                })
                return res.status(200).json({
                    arr
                })
            }
});


module.exports = router;