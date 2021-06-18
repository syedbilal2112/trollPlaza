import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import api from "../containers/apiMiddleWare";
import { PropTypes } from 'react';
import '../css/style.css';
class signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            body: {

            },
            toDashboard: false
        }
    }
    signin = async () => {
        let payload = {
            password: this.state.body.password,
            email: this.state.body.email
        }
        let res = await api.login(
            "auth/signin/", payload
        );
        if (res.status === 200) {
            sessionStorage.setItem("mtp", res.data.token)
            this.setState({
                toDashboard: true
            });
        } else {
            alert('Login Unsuccessful')
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
        if (this.state.toDashboard === true) {
            return <Redirect to='/dashboard' />
        }
        return (
            <div className="wrapper">
                <form className="form-signin">
                    <h2 className="form-signin-heading">Sign In</h2>
                    <input type="email" className="form-control" name="name" placeholder="Email Address" required onChange={(e) => this.enterInputValue(e.target.value, 'email')} /><br />
                    <input type="password" className="form-control" name="password" placeholder="Password" required onChange={(e) => this.enterInputValue(e.target.value, 'password')} />
                    <button className="btn btn-primary" type="button" onClick={(e) => this.signin()} >Login</button> 
                    <a className="btn btn-primary" style={{float: 'right'}}><Link to="/signup" style={{color: 'white'}}>Register ?</Link></a>
                </form>
            </div>
        )
    }
}


signin.contextTypes = {
    // eslint-disable-next-line
    router: { PropTypes }.object
}

export default signin;