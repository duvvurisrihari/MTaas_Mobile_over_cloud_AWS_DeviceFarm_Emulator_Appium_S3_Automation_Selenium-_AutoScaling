import React, { Component } from 'react';
import axios from 'axios';
import Constants from '../../../utils/constants'

class DeleteDevice extends Component {

    deletePool = () => {
        console.log(this.props.arn)
        axios.delete(`${Constants.BACKEND_SERVER.URL}/devicefarm/deletepool?arn=${this.props.arn}`)
            .then(() => {
                this.props.handler()
            })
    }


    render() {

        let button = []
        const defaultARNs = ['arn:aws:devicefarm:us-west-2::devicepool:082d10e5-d7d7-48a5-ba5c-b33d66efa1f5', 'arn:aws:devicefarm:us-west-2::devicepool:1c59cfd0-ee56-4443-b290-7a808d9fd885']
        if (defaultARNs.includes(this.props.arn) === false) {
            button = <button className="btn btn-danger btn-sm" onClick={this.deletePool}>Delete</button>
        }

        return (
            <div>
                {button}
            </div>

        )
    }

}

class Landing extends Component {

    constructor() {
        super()
        this.state = {
            allDevicePools: [],
        }
    }

    componentDidMount() {
        axios.get(`${Constants.BACKEND_SERVER.URL}/devicefarm/listDevicePools?projectId=${this.props.projectId}`)
            .then((response) => {
                // console.log(response.data.devicePools);
                this.setState({
                    allDevicePools: response.data.devicePools
                })
            })
    }

    updateList = () => {
        axios.get(`${Constants.BACKEND_SERVER.URL}/devicefarm/listDevicePools?projectId=${this.props.projectId}`)
            .then((response) => {
                console.log(response.data.devicePools);
                this.setState({
                    allDevicePools: response.data.devicePools
                })
            })
    }

    render() {

        let allDevicesPools = [],
            index,
            devicePoolObj
        if (this.state.allDevicePools.length > 0) {
            allDevicesPools.push(
                <div className="row">
                    <div className="col-md-4 font-weight-bold">Name</div>
                    <div className="col-md-3 font-weight-bold">Type</div>
                    <div className="col-md-2 font-weight-bold">Max Devices</div>
                </div>
            );
            for (index in this.state.allDevicePools) {
                devicePoolObj = this.state.allDevicePools[index]
                allDevicesPools.push(
                    <div className="row mt-1">
                        <div className="col-md-4">{devicePoolObj.name}</div>
                        <div className="col-md-3">{devicePoolObj.type}</div>
                        <div className="col-md-2">{devicePoolObj.maxDevices}</div>
                        <div className="col-md-2"><DeleteDevice arn={devicePoolObj.arn} handler={this.updateList} /></div>
                    </div>
                );
            }
        } else {
            allDevicesPools.push(<h5 className="text-info font-weight-light">There are no device pools available in this project at the moment</h5>)
        }

        return (
            <div>
                <p className="display-4">List of created device pools</p>
                {allDevicesPools}
            </div>
        )
    }
}
//export Landing Component
export default Landing;