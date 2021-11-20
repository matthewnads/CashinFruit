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

router.route('/create').post((req,res)=> {
//use this to create the link token 
});
module.exports = router;