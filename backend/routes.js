const router = require('express').Router();
const User = require('./models/user.model');
const plaid = require('plaid');
require('dotenv').config(); 
const util = require('util'); 
const moment = require('moment');
const { response } = require('express');
const axios = require('axios');
const { useParams } = require('react-router-dom');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const twilio = require('twilio');
const accountSid = 'AC896a4d16930bd6c04578da0277f55303'
const authToken = 'e4df7d65e4630e8b040172496c3f8633'


const client = require('twilio')(accountSid, authToken);




const host = 'https://sandbox.plaid.com' ;
const hook = 'https://6cff9ccdd81443604a8738b54d665a28.m.pipedream.net';



const PLAID_CLIENT_ID= "5ff8b9f6f9c7ee001182a6a5"
const PLAID_SECRET="c89bbab46049994073ab6ea9aee61e"
const PLAID_ENV = 'sandbox';

const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || 'transactions').split(
    ',',
  );

const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(
    ',',
);

const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI || '';


let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;
let ITEM_ID = null;
let linkToken = null; 
let currentUser = new User(); 


router.route('/').get((req,res)=>{
    res.send("hello world")
})

/**
 * Token exchange process: 
 * Get link by calling /link/token/create
 * initialize link by passing the link token, and getting a public_token after success 
 * exchange the public token for an access token by calling /item/public_token/exchange 
 */
router.route('/create').post((req,res)=> {
//use this to create the link token 
    const data = {
        user: {
        // This should correspond to a unique id for the current user.
        client_user_id: 'user-id',
        },
        client_name: 'Budget Bud',
        products: PLAID_PRODUCTS,
        country_codes: PLAID_COUNTRY_CODES,
        language: 'en',
        webhook: hook,
        client_id: PLAID_CLIENT_ID,
        secret: PLAID_SECRET,
        redirect_uri: PLAID_REDIRECT_URI
    };

  axios.post(host+'/link/token/create', data).then((response)=>{
    linkToken = response.data.link_token; 
    res.json(response.data.link_token);
  }).catch((error)=>{
    console.log(error)
  });

  
});



router.route('/api/set_access_token').post((request, response) => {
  PUBLIC_TOKEN = request.body.public_token; 

  const data = {
    client_id: PLAID_CLIENT_ID,
    secret: PLAID_SECRET,
    public_token: PUBLIC_TOKEN
  }
  
  
  axios.post(host+'/item/public_token/exchange',data).then((res)=>{
    ACCESS_TOKEN = res.data.access_token;
    ITEM_ID = res.data.item_id;
    //have to update currentUser with these tokens
    currentUser.item_id = ACCESS_TOKEN;
    currentUser.access_token = ITEM_ID;

    currentUser.save()
    .then(()=>res.json('Plaid connection success'))
    .catch(err=>res.status(400).json('Plaid Error: '+ err));
  
  
  }).catch((error)=>{
    console.log(error)
  })


}); 



router.route('/add').post((req,res)=>{
  //getting user info from database 
  const firstname = req.body.firstname; 
  const lastname = req.body.lastname; 
  const phone = Number(req.body.phone);
  const budget = Number(req.body.budget);
  const current = Number(req.body.current);



  //saving into database 
  currentUser.firstname = firstname; 
  currentUser.lastname = lastname; 
  currentUser.phone = phone; 
  currentUser.budget = budget; 
  currentUser.current = current; 

  currentUser.save()
  .then(()=>res.json('User added!'))
  .catch(err=> res.status(400).json('Error: '+ err)); 

  client.messages.create({
    to: phone,
    from: '+19798032820',
    body: 'Welcome to CashinFruit! Are you ready to start budgeting your money like a pro? You will be getting weekly reminders regarding your road to being financially free!'
  })
    .then((message)=>console.log(message.sid));
})


/**
 * Route for webhooks 
 */
router.route('/hooks').post((req,res)=>{
  
})
module.exports = router;