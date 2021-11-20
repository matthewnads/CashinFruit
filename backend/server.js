const express = require('express'); 
const cors= require('cors'); 
const mongoose = require('mongoose');
require('dotenv').config(); 
const twilio = require('twilio');
const accountSid = 'AC896a4d16930bd6c04578da0277f55303';
const authToken = 'c292f6b938e29080c7be83df1d402c68';
const client = new twilio(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

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