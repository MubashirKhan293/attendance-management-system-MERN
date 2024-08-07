require('dotenv').config();
const express=require('express');
const router= require('./routers/auth-routers')
const cors = require('cors');
const path = require('path');
const connectDB=require('./utils/db')
const app=express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/',router);

const PORT= 5000;

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`your server is running on : ${PORT}`)
    })
})