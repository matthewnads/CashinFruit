import React, {Component, useEffect, useState} from 'react'; 
import {Link} from 'react-router-dom';
import axois from 'axios'; 
import {usePlaidLink} from 'react-plaid-link'; 
import axios from 'axios';

export default class LinkChild extends Component {
    constructor(props) {
        super(props); 

    }

    render() {
        
        return (
            <h1>You've successfully linked your account. Check your phone for a text!</h1>
        )
    }
}