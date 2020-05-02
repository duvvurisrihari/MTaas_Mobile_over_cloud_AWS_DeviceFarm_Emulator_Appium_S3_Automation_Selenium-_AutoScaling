import React, { Component } from 'react';
import Footer from '../common/footer';
import Constants from '../../utils/constants';
import axios from 'axios';
import { Redirect } from 'react-router';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginId: '',
            password: '',
            errMsg: '',
            successMsg: ''
        }
    }

    loginIdChangeHandler = (e) => {
        this.setState({
            loginId: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    submitLogin = (e) => {
        var usrData = {
            email: this.state.loginId,
            password: this.state.password,
        }
        axios.post(Constants.BACKEND_SERVER.URL + "/admin/login", usrData)
        .then((response) => {
            console.log(response.data);
            localStorage.setItem('281Username', response.data.name);
            localStorage.setItem('281UserId', response.data._id);
            localStorage.setItem('281UserType', response.data.type);
            this.setState({
                loginId: '',
                password: '',
            })
        })
        .catch(() => {
            this.setState({
                errMsg: 'Failed to login',
                successMsg: '',
            });
        })
    }

    render() {
        let RedirectVar;
        if (localStorage.getItem('281UserId')) {
            RedirectVar = <Redirect to="/admin/dashboard" />
        }

        return (
            <div>
                { RedirectVar }
                {/* <!-- Card with information --> */}
                <div class="bg-white p-5">

                    <div className="row pt-5">
                        <div className="col-md-4 offset-md-4 p-5 shadow">
                            <h5 className="text-center font-weight-bolder">Login</h5>
                            <div className="mt-3">
                                <div className="form-group">
                                    <label htmlFor="userLoginID">Email</label>
                                    <input type="text" id="userLoginID" onChange={this.loginIdChangeHandler} value={this.state.loginId} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userPassword">Password</label>
                                    <input type="password" id="userPassword" onChange={this.passwordChangeHandler} value={this.state.password} className="form-control" required />
                                </div>
                                <div className="text-center">
                                    <p className="text-danger">
                                        {' '}
                                        {this.state.errMsg}
                                        {' '}
                                    </p>
                                </div>
                                <div className="form-group">
                                    <input type="submit" id="userLogin" onClick={this.submitLogin} className="form-control bg-primary text-white" value="Login" />
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