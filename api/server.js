const bodyParser = require('body-parser')
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRouter = require('./routes/user');
const carRouter = require('./routes/car');
app.use('/user', userRouter);
app.use('/car', carRouter);

module.exports = app