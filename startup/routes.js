const express = require('express');

const userRoutes = require('../routes/users');
module.exports = function(app){
    app.use(express.json());
    app.use('/user',userRoutes);
}