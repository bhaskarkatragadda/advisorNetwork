const express = require('express');
var path = require('path');
const userRoutes = require('../routes/Users');
const adminRoutes = require('../routes/admin');
module.exports = function(app){
    app.use(express.json());
    app.get('/', async (req,res) =>{
        return res.render('index');
    });
    app.use('/admin',adminRoutes);
    app.use('/user',userRoutes);
}