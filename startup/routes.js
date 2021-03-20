const express = require('express');
const userRoutes = require('../routes/Users');
const adminRoutes = require('../routes/admin');

module.exports = function(app){
    app.use(express.json());
    app.use('/admin',adminRoutes);
    app.use('/user',userRoutes);
}