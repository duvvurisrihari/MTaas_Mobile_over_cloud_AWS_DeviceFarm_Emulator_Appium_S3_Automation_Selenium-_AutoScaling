import React, { Component } from 'react';

class Header extends Component {

    render() {

        return (
            <div>
                <div class="row">
                    <div class="col-md-10">
                        <h1 class="display-1 text-break font-weight-bolder"><a href="/" class="text-dark text-decoration-none">Device Farm</a></h1>
                    </div>
                    <div class="col-md-2 pt-4">
                        <p class="text-break">Hello, {localStorage.getItem('281Username')}</p>
                    </div>
                </div>
            </div>
        )
    }
}
//export Header Component
export default Header;