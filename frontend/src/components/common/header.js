import React, { Component } from 'react';
import logo from '../../../src/Assets/Icons/Logo.png'


class Header extends Component {

    render() {
        let logoutUser
        if (localStorage.getItem('281UserId')) {
            logoutUser = <a href="/logout"> <button class="btn">Logout</button></a>
        }
        var display;
        let dashboardlinker;
        if (window.location.pathname === '/login' || window.location.pathname === '/create-account') {
            display = "";
            dashboardlinker = '/'
        } else if (localStorage.getItem('281UserType') === "Manager") {
            dashboardlinker = '/manager/dashboard'
            display = [
                <div class="col-md-2 pt-4" style={{ display: 'flex', width: '400px', justifyContent: 'space-around' }}>
                    <p class="text-break">Hello, {localStorage.getItem('281Username')}</p>
                    <a href="/manager/update-account">
                        <button class="btn btn-outline-dark">Profile</button>
                    </a>
                    {logoutUser}
                </div>
            ]
        } else if (localStorage.getItem('281UserType') === "Tester") {
            dashboardlinker = '/tester/dashboard'
            display = [
                <div class="col-md-2 pt-4" style={{ display: 'flex', width: '400px', justifyContent: 'space-around' }}>
                    <p class="text-break">Hello, {localStorage.getItem('281Username')}</p>
                    <a href="/tester/update-account">
                        <button class="btn ">Profile</button>
                    </a>
                    {logoutUser}

                </div>
            ]
        } else {
            display = [
                <div class="col-md-2 pt-4" >
                    <a href="/login">
                        <button class="btn btn-link">Login</button>
                    </a>

                    <a href="/create-account">
                        <button class="btn btn-link">Create account</button>
                    </a>
                </div>
            ]
        }

        return (
            <div style={{ background: '#f8f9fb' }}>
                <div class="row">
                    <div class="col-md-10">
                        <a href={dashboardlinker} class=" headerLogo text-dark text-decoration-none" style={{ display: 'flex' }}>
                            <img src={logo} style={{ height: '90px' }} alt="logo"/>
                            <h1 class="display-4 text-break ">Mobile TaaS</h1>
                        </a>
                    </div>
                    {display}
                    {/* { loginText } */}
                </div>
            </div>
        )
    }
}
//export Header Component
export default Header;