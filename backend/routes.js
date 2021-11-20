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



// const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
// const PLAID_SECRET = process.env.PLAID_SECRET;
// const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

// const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || 'transactions').split(
//     ',',
//   );

// const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(
//     ',',
// );

// const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI || '';


// let ACCESS_TOKEN = null;
// let PUBLIC_TOKEN = null;
// let ITEM_ID = null;
// let linkToken = null; 
// let currentUser = new User(); 

// const client = new plaid.Client({
//     clientID: PLAID_CLIENT_ID,
//     secret: PLAID_SECRET,
//     env: plaid.environments[PLAID_ENV],
//   });


router.route('/').get((req,res)=>{
    res.send("hello world")
})

module.exports = router;