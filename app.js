const winston=require('winston');
const express=require('express');
const app=express();
const path = require('path');

app.set('views', path.join(__dirname,'public'));
app.set('view engine', 'pug');


require('./startup/routes')(app);
require('./startup/db')();
require('./startup/prod')(app);

const port=process.env.PORT||5000;
app.listen(port,()=>winston.info(`Listening on port ${port}`));