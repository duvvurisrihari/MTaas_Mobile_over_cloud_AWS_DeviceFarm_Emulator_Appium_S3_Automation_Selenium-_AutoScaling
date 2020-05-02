import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../common/footer';
import Header from '../common/header';

import Constants from '../../utils/constants';
import axios from 'axios';
import { Redirect } from 'react-router';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            type: 'Tester',
            errMsg: '',
            successMsg: '',
        };
    }

    IsValueEmpty = (Value) => {
        if (Value == null) {
            return false;
        }
        if (''.localeCompare(Value.replace(/\s/g, '')) === 0) return true;
        return false;
    }

    IsValidEmailID = (EmailID) => {
        if (EmailID == null) {
            return true;
        }
        if (EmailID.match(/^[a-z][a-z0-9._]*[@][a-z]+[.][a-z]+$/)) {
            return true;
        }
        return false;
    }

    IsValidName = (Name) => {
        if (Name.match(/^[a-zA-Z][a-zA-Z ]+$/)) {
            return true;
        }
        return false;
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value,
        });
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    typeChangeHandler = (e) => {
        this.setState({
            type: e.target.value,
        });
    }

    createAccount = (e) => {
        e.preventDefault();
        if (!this.IsValidName(this.state.name)) {
            this.setState({
                errMsg: "Name has to begin with a alphabet"
            })
            return;
        }
        if (!this.IsValidEmailID(this.state.email)) {
            this.setState({
                errMsg: "Not a valid email ID"
            })
            return;
        }
        if (this.IsValueEmpty(this.state.password)) {
            this.setState({
                errMsg: "Password cannot be empty"
            })
            return;
        }
        const usrData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            type: this.state.type
        }
        axios.post(Constants.BACKEND_SERVER.URL + "/users/signup", usrData)
            .then((response) => {
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    type: 'Tester'
                });
                if (response.status === 201) {
                    this.setState({
                        successMsg: 'User created successfully',
                        errMsg: '',
                    });
                } else if (response.status === 409) {
                    this.setState({
                        successMsg: '',
                        errMsg: 'Account with this email already exists',
                    });
                }
            })
            .catch(() => {
                this.setState({
                    errMsg: 'Failed to create account',
                    successMsg: '',
                });
            });

    }

    render() {
        let RedirectVar;
        if (localStorage.getItem('281User')) {
            RedirectVar = <Redirect to="/tester/dashboard" />
        }

        return (
            <div>
                <Header />
                {RedirectVar}
                {/* <!-- Card with information --> */}
                <div class=" p-5">

                    <div className="row pt-5 mb-5">
                        <div className="col-md-6 offset-md-3 p-5 shadow">
                            <h5 className="text-center font-weight-bolder">Create Account</h5>
                            <div className="mt-3">
                                <div className="form-group">
                                    <label htmlFor="userLoginID">Name</label>
                                    <input type="text" id="userLoginID" onChange={this.nameChangeHandler} value={this.state.name} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userLoginID">Email</label>
                                    <input type="text" id="userLoginID" onChange={this.emailChangeHandler} value={this.state.email} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userPassword">Password</label>
                                    <input type="password" id="userPassword" onChange={this.passwordChangeHandler} value={this.state.password} className="form-control" required />
                                </div>
                                <div>User type</div>,
                                <div className="form-group">
                                    <select className="form-control" onChange={this.typeChangeHandler} value={this.state.type}>
                                        <option value="Tester">Tester</option>
                                        <option value="Manager">Manager</option>
                                    </select>
                                </div>
                                <div className="text-center">
                                    <p className="text-danger">
                                        {' '}
                                        {this.state.errMsg}
                                        {' '}
                                    </p>
                                    <p className="text-success">
                                        {' '}
                                        {this.state.successMsg}
                                        {' '}
                                    </p>
                                </div>
                                <div className="form-group">
                                    <input type="submit" id="userLogin" onClick={this.createAccount} className="form-control bg-primary text-white" value="Create account" />
                                </div>
                                <div className="panel text-center">
                                    <p>or</p>
                                    <p>
                                        Already have an account? <Link to="/login">Sign in</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        )
    }
}
//export Home Component
export default Home;