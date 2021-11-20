import React, {Component, useEffect, useState} from 'react'; 
import {Link} from 'react-router-dom';
import axois from 'axios'; 
import {usePlaidLink} from 'react-plaid-link'; 
import axios from 'axios';

export default class LinkChild extends Component {
    constructor(props) {
        super(props); 
        this.getItem = this.getItem.bind(this); 
        this.getBudget = this.getBudget.bind(this); 
        this.getHook = this.getHook.bind(this); 
        this.state={
            budget:0
        }
    }

    getItem() {
        axios.get('http://localhost:5000/link/api/get_item').then( res=> {
            console.log(res.data.item)
            }
        )
    }

    getBudget(e) {
        this.setState({
            budget:e.target.value
        })
    }

    getHook() {
        axios.post('http://localhost:5000/link/api/test_hook')
    }
    render() {
        
        return (
            <h1>You've successfully linked your account. Check your phone for a text!</h1>
        )
    }
}