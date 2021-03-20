const express = require('express');
const userRoutes = require('../routes/Users');
const adminRoutes = require('../routes/admin');
const Root = require('../routes/root');

module.exports = function(app){
    app.use(express.json());
    app.use(Root);
    app.use('/admin',adminRoutes);
    app.use('/user',userRoutes);
}