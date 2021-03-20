const express = require('express');
const router = express.Router();

router.get('/', async (req,res) =>{
    return res.status(200).write('<h2>Hello ! This is only REST API service, please use postman to use the api</h2>');
});
module.exports = router;