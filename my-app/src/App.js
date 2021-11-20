import React, { Component } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/navbar.component"
import Infoform from "./components/infoform.component";
import LinkToken from "./components/link.component";
import LinkChild from './components/linkchild.component'; 

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      linkToken : ''
    }
    this.getToken = this.getToken.bind(this); 
  }
  componentDidMount() {
    const script = document.createElement('script');

    script.src = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';
    script.async=true;

    document.body.appendChild(script); 
  }

  getToken(token) {
    this.setState({
        linkToken: token 
    });
  }
  render(){

    let show; 
    if (this.state.linkToken ===''||this.state.linkToken=== null) {
      show = <Route exact path="/" render={(props) => (
        <Infoform sendToken={this.getToken}/>
      )}/>
    } else {
      show = <Route exact path="/" render={(props)=>(
        <LinkToken token={this.state.linkToken}/>
      )}/>
    }
    return (
      <Router>
          <div className="container ">
            <Navbar/>
            <br/>
            <div className="container d-flex justify-content-center">
              <div className="my-auto justify-center " >
                {show}
                <Route path='/success' component ={LinkChild}></Route>
              </div>
            </div>
          </div>
      </Router>
    );
  }
}


