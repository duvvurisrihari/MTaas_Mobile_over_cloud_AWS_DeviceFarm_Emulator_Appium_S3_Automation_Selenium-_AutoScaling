import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Home extends Component {

    render() {

        let Navbar = [];
        if (!localStorage.getItem('281UserType')) {
            Navbar = <Redirect to="/login" />
        } else if (localStorage.getItem('281UserType') === "Manager") {
            Navbar = [
                <div class="row bg-dark text-center " style={{ height: '50px', fontSize: '19px', width: '100vw' }}>
                    <div class="col-md-2 p-2"><a href="/manager/dashboard" class="text-white">Home</a></div>
                    <div class="col-md-2 p-2"><a href="/manager/project/all" class="text-white">My projects</a></div>
                    <div class="col-md-2 p-2"><a href="/manager/project/new" class="text-white">Post new project</a></div>
                    <div class="col-md-2 p-2"><a href="/manager/bugs/all" class="text-white">Bugs</a></div>
                    <div class="col-md-2 p-2"><a href="/manager/billing" class="text-white">Billing</a></div>
                    
                </div>
            ]
        } else {
            Navbar = [
                <div class="row bg-dark text-center " style={{ height: '50px', fontSize: '19px' }}>
                    <div class="col-md-2 p-2"><a href="/tester/dashboard" class="text-white">Home</a></div>
                    <div class="col-md-2 p-2"><a href="/tester/project/all" class="text-white">All projects</a></div>
                    <div class="col-md-2 p-2"><a href="/tester/project/accepted" class="text-white">My projects</a></div>
                    <div class="col-md-2 p-2"><a href="/tester/bugs/all" class="text-white">Bugs</a></div>
                    <div class="col-md-2 p-2"><a href="/tester/announcements" class="text-white">Announcements</a></div>
                </div>
            ]
        }

        return (
            <div>
                {Navbar}
            </div>
        )
    }
}
//export Home Component
export default Home;