const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/signin', async (req,res) =>{
    try{
               const userObj =  await User.findOne({email:req.body.email});
               if(userObj){
                   const isPassword = await userObj.authenticate(req.body.password);
                   if(isPassword){
                       return res.status(200).json({
                           messgage:"login successful",
                           data:userObj
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
                    return res.status(200).json({
                        messgage:'Successfully registered',
                        data:result
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
})

module.exports = router;