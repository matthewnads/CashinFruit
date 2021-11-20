const express = require('express'); 
const cors= require('cors'); 
const mongoose = require('mongoose');
var path = require('path');
require('dotenv').config(); 

const app = express(); 
const port = process.env.PORT||5000; 

app.use(cors()); 
app.use(express.json());




const uri = "mongodb+srv://cashinflow:honeymoney@cluster0.mmfcm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true});
const connection = mongoose.connection; 
connection.once('open', () => {
    console.log('MDB connection success')
 });

const routes = require('./routes');
app.use('', routes)

app.listen(port, () => {
    console.log(`Server be running on port: ${port}`); 
}); 