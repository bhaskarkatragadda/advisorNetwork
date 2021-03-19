const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Advisor = require('../models/advisor');
const Booking = require('../models/bookings');
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
               }else{
                   return res.status(400).json({
                       message:"Invalid Email"
                   })
               }
    }catch(e){
            return res.status(400).json({
                messgage:"Somethin went wrong"
            })
    }
})

router.post('/register', async (req,res) =>{
    try{
            const { name, email, password } = req.body;
            let user_obj =  await User.findOne({email:email});
            if(user_obj){
                return res.status(409).json({
                    message:'User already registerd'
                });
            }
            const hash_password = await bcrypt.hash(password,10);
            const newUser = new User({ name:name, email:email,  hash_password: hash_password });
            const result = await newUser.save();
            if(result){
                let token=result.generatetoken();
                return res.status(200).json({
                    messgage:'Successfully registered',
                    JWT_token:token,
                    userId:result._id
                });
            }   
    }catch(e){
            return res.status(500).json({
                messgage:'Something went wrong'
            });
    }
});


router.get('/:userId/advisor', async (req,res) => {
    try{
        const advisor =  await Advisor.find();
        if(advisor.length !=0){
            return res.status(200).json({
                    advisor
            });
        }else{
            return res.status(404).json({
                message:"No advisors found"
            });
        }
    }catch(e){
            return res.status(500).json({
                message:"Somethin went wrong"
            })
    }
  
});

router.post('/:userId/advisor/:advisorId', async (req,res) => {
    try{
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
                        message:"UserId or AdvisorId are not present"
                    })
                }
        }else{
            return res.status(400).json({
                message:"Invalid UserId or AdvisorId"
            })
        }
    }catch(e){
            return res.status(500).json({
                message:"Something went wrong"
            });
    }
     
});

router.get('/:userId/advisor/booking', async (req,res) => {
    try{
        const userId = req.params.userId;
        if(validator(userId)){
            const data = await Booking.find({userId:userId}).populate('advisorId');
            let Bookings = new Array();
            data.forEach( async (element) =>{
               let bookingObj = {
                   advisorId: element.advisorId._id,
                   advisorName:element.advisorId.name,
                   advisorProfilelUrl: element.advisorId.photoUrl,
                   bookingId:element._id,
                   bookingTime:element.bookingTime
               };
               arr.push(bookingObj);
            })
            return res.status(200).json({
                Bookings
            })
        }else{
            return res.status(400).json({
                message:"Invalid UserId"
            })
        }
    }catch(e){
            return res.status(500).json({
                message:"Something went wrong"
            })
    }
            
});


module.exports = router;