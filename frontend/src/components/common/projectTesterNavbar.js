import React, { Component } from 'react';

class Home extends Component {

    render() {

        return (
            <div class="row text-center bg-dark font-weight-bold mt-1">
                <div class="col-md-4 p-2 bg-white"><a href={`/tester/project/view/${this.props.projectObj._id}`} class="text-dark font-weight-light">{this.props.projectObj.name}</a></div>
                <div class="col-md-2 p-2"><a href={`/tester/project/run/schedule/${this.props.projectObj._id}`} class="text-white font-weight-light">Schedule run</a></div>
                <div class="col-md-2 p-2"><a href={`/tester/project/run/view/${this.props.projectObj._id}`} class="text-white font-weight-light">View runs</a></div>
                <div class="col-md-2 p-2"></div>
                <div class="col-md-2 p-2"></div>
            </div>
        )
    }
}
//export Home Component
export default Home;