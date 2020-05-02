import React, { Component } from 'react';

class Home extends Component {

    render() {

        return (
            <div class="row text-center bg-dark mt-1">
                <div class="col-md-4 p-2 bg-white"><a href={`/manager/project/view/${this.props.projectObj._id}`} class="text-dark">{this.props.projectObj.name}</a></div>
                <div class="col-md-2 p-2"><a href={`/manager/project/runs/devicefarm/${this.props.projectObj._id}`} class="text-white">View runs on device farm</a></div>
                <div class="col-md-2 p-2"><a href={`/manager/project/runs/emulators/${this.props.projectObj._id}`} class="text-white">View runs on emulators</a></div>
                <div class="col-md-2 p-2"><a href={`/manager/project/costs/${this.props.projectObj._id}`} class="text-white">View costs</a></div>
            </div>
        )
    }
}
//export Home Component
export default Home;