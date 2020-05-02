import React, { Component } from 'react';

class Home extends Component {

    render() {

        return (
            <div>
                <div class="row bg-dark text-center font-weight-bold">
                    <div class="col-md-2 p-2"><a href="/admin/dashboard" class="text-white">Home</a></div>
                    <div class="col-md-2 p-2"><a href="/admin/projects" class="text-white">View projects</a></div>
                    <div class="col-md-2 p-2"><a href="/admin/managers" class="text-white">View Managers</a></div>
                    <div class="col-md-2 p-2"><a href="/admin/testers" class="text-white">View Testers</a></div>
                </div>
            </div>
        )
    }
}
//export Home Component
export default Home;