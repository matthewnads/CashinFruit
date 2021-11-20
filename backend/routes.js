const router = require('express').Router();
const User = require('./models/user.model');
const plaid = require('plaid');
require('dotenv').config(); 
const util = require('util'); 
const moment = require('moment');
const { response } = require('express');
const axios = require('axios');
const { useParams } = require('react-router-dom');

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

  
  
  }).catch((error)=>{
    console.log(error)
  })


}); 

router.route('/add').get((req,res)=>{
  //add to mongodb
})
module.exports = router;