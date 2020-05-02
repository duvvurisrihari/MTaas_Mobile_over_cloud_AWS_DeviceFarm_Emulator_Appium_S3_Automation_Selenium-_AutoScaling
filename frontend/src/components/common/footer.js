import React, { Component } from 'react';

class Home extends Component {

    render() {
        let logoutUser
        if (localStorage.getItem('281UserId')) {
            logoutUser = <p>Not {localStorage.getItem('281Username')}? <a href="/logout">Logout</a></p>
        }
        return (
            <div class="row  border-top" style={{ position: 'relative', botton: '0%', background: '#343c43', color: '#fff', display: 'flex', justifyContent: 'space-around' }}>
                <div class="col-6 " style={{ paddingLeft: '50px' }}>
                    <h1 class="font-weight-light">CMPE 281 Project</h1>
                    <h2 class="font-weight-light">Prof. Jerry Gao</h2>
                    {logoutUser}
                </div>
                <div class="col-6">
                    <div class="row">
                        <div class="col-md-6">© Jayasurya Pinaki</div>
                        <div class="col-md-6">014491854</div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">© Nihanjali Mallavarapu</div>
                        <div class="col-md-6">014492933</div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">© Vamsi Krishna Chakravartula</div>
                        <div class="col-md-6">014488487</div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">© Vasanthi Amoolya Koduri</div>
                        <div class="col-md-6">014533649</div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">© Venkata Sai Srihari Duvvuri</div>
                        <div class="col-md-6">014533571</div>
                    </div>
                </div>
            </div>
        )
    }
}
//export Home Component
export default Home;