const express = require('express');
const router = express.Router();
const Advisor = require('../models/advisor');

module.exports = router;

router.post('/advisor', async (req, res) => {
    try{
        const {name,photoUrl} = req.body;
        if(name && photoUrl){
            const advisor = new Advisor({name:name,photoUrl:photoUrl});
            const result = await advisor.save();
            if(result){
                return res.status(200).end();
            }
        }else{  
            return res.status(400).json({
                message:"Fields are missing"
            });
        }
    }catch(e){
        return res.status(500).json({
            message:"Something went wrong"
        });
    }

});