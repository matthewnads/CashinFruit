import axios from 'axios';
import React, {Component} from 'react'; 

export default class Infoform extends Component {
    constructor(props) {
        super(props); 
        this.ChangeFirst = this.ChangeFirst.bind(this); 
        this.ChangeLast = this.ChangeLast.bind(this);
        this.ChangeNumber = this.ChangeNumber.bind(this) ; 
        this.ChangeBudget = this.ChangeBudget.bind(this); 
        this.onSubmit = this.onSubmit.bind(this); 
        this.state = {
            firstname: '',
            lastname: '', 
            number: '',
            budget: 0,
            currentdollars: 0,
            link: ''
        }
    }
    ChangeFirst(e) {
        this.setState({
            firstname: e.target.value
        });
    }
    ChangeLast(e) {
        this.setState({
            lastname: e.target.value
        })
    }
    ChangeNumber(e) {
        this.setState({
            number: e.target.value
        })
    };

    ChangeBudget(e) {
        this.setState({
            budget: e.target.value
        })
    };
    
    onSubmit(e) {
        e.preventDefault(); 

        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname, 
            phone: this.state.number,
            budget: this.state.budget,
            current: this.state.currentdollars
        }

    //    console.log(user); 

        axios.post('http://cashinfruit.com/add', user)
        .then(res=>console.log(res.data));

        axios.post('http://cashinfruit.com/create', user).then(res => {
        //TODO : set res.data to a prop and then follow react component section from github page    

            this.props.sendToken(res.data); 
        }); 


      
        

        
    }
    render() {
        
        return (
            <div>
                <h1>Fill in the info below</h1>
                <form onSubmit={this.onSubmit}>
                    
                    <div className="form-group">
                        <label>First Name: </label>
                        <input type="text" required 
                        className="form-control"
                        value={this.state.firstname}
                        onChange={this.ChangeFirst}/>
                    </div>
                    <div className="form-group">
                        <label>Last Name: </label>
                        <input type="text" required 
                        className="form-control"
                        value={this.state.lastname}
                        onChange={this.ChangeLast}/>
                    </div>
                    <div className="form-group">
                        <label>Phone Number (1234567890): </label>
                        <input type="tel" required 
                        className="form-control"
                        maxLength="10"
                        value={this.state.number}
                        onChange={this.ChangeNumber}/>
                    </div>
                    <label htmlFor="budget">Weekly Budget (enter dollar amount): </label>
                    <div className="form-group input-group">
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>$</span>
                        </div>
                        <input type="number" required id="budget"
                        className="form-control"
                        value={this.state.budget}
                        onChange={this.ChangeBudget}/>
                        <div className='input-group-append'>
                            <span className='input-group-text'>.00</span>
                        </div>
                    </div> 

                    <div className="form-group">
                        <input type='submit' value="Link Bank Account" className='btn btn-primary'></input>
                    </div>
                </form>
            </div>
        )
    }
}