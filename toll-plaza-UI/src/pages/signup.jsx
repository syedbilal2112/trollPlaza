import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import api from "../containers/apiMiddleWare";
import { PropTypes } from 'react';
import Select from 'react-select'
import '../css/style.css';
class signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            body: {

            },
            isLogin: false
        }
    }
    signup = async () => {
        let payload = {
            name: this.state.body.name,
            email: this.state.body.email,
            mobileNumber: this.state.body.mobileNumber,
            password: this.state.body.password
        }
        let res = await api.register(
            "auth/signup/", payload
        );
        if (res.status === 200) {
            this.setState({
                isLogin: true
            });
        } else {
            alert('Register Unsuccessful')
        }
    }
    enterInputValue(value, type) {
        let body = this.state.body;
        body[type] = value;
        this.setState({
            body
        });
    }

    componentDidMount() {

    }
    render() {
        if (this.state.isLogin === true) {
            return <Redirect to='/' />
        }
        return (
            <div className="wrapper">
                <form className="form-signin">
                    <h2 className="form-signin-heading">Register</h2>
                    <input type="text" className="form-control" name="name" placeholder="Name" required onChange={(e) => this.enterInputValue(e.target.value, 'name')} /><br />
                    <input type="email" className="form-control" name="name" placeholder="Email Address" required onChange={(e) => this.enterInputValue(e.target.value, 'email')} /><br />
                    <input type="number" className="form-control" name="number" placeholder="Mobile Number" required onChange={(e) => this.enterInputValue(e.target.value, 'mobileNumber')} /><br />
                    <input type="password" className="form-control" name="password" placeholder="Password" required onChange={(e) => this.enterInputValue(e.target.value, 'password')} />
                    <button className="btn btn-primary" type="button" onClick={(e) => this.signup()} >Register</button> 
                    <a className="btn btn-primary" style={{float: 'right'}}><Link to="/" style={{color: 'white'}}>Sign in ?</Link></a>
                </form>
            </div>
        )
    }
}


signup.contextTypes = {
    // eslint-disable-next-line
    router: { PropTypes }.object
}

export default signup;