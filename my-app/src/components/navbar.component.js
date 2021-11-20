import React, {Component} from 'react'; 
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
    constructor(props) {
        super(props); 
    }
    render() {
        return (
            
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                {/* check out bootstrap documentation for full details on classnames and stuff*/}
                <Link to="/" className="navbar-brand">BudgetBud</Link>
                <div className="collpase navabar-collapse">
                    <button type="button" className="btn btn-default navbar-btn bg-light">Other Projects</button>
                    
                </div>
            </nav>
        )
    }
}