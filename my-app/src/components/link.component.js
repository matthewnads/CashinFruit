import React from 'react'; 
import {PlaidLink} from 'react-plaid-link'; 
import axios from 'axios';

const LinkToken = props => {
    const onSuccess = (token, metadata) => {
      // send token to server
      axios.post('http://localhost:5000/link/api/set_access_token', {public_token: token})
      window.location = '/items';
    };

    const onExit = (error, metadata) => {
        console.log(error)
    }; 

    const onLoad = props => {

    };

    const onEvent = (eventName, metadata) => {
        
    };

    const receivedRedirectUri = 'http://localhost:3000/items';
  
    return (
      <div>
            <PlaidLink
                token={props.token}
                onSuccess={onSuccess}
                
                
            >
                Connect a bank account
            </PlaidLink>
      
      </div>
      
    );
  };
  export default LinkToken;