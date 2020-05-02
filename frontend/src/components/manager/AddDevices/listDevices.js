import React, { Component } from 'react';
import axios from 'axios';
import Constants from '../../../utils/constants'

class Landing extends Component {

    constructor() {
        super()
        this.state = {
            allDevices: [],
            currentIndex: null
        }
    }

    componentDidMount() {
        axios.get(`${Constants.BACKEND_SERVER.URL}/project/devices/all?projectId=${this.props.projectId}`)
            .then((response) => {
                // console.log(response.data.devices);
                this.setState({
                    allDevices: response.data.devices
                })
            })
    }

    deviceChangeHandler = (e) => {
        this.setState({
            currentIndex: e.target.value
        })
    }

    getCurrentDevice = () => {
        return this.state.allDevices[this.state.currentIndex]
    }

    render() {

        let allDevices = [],
            index,
            deviceObj

        for (index in this.state.allDevices) {
            deviceObj = this.state.allDevices[index]
            allDevices.push(<option value={index}>{deviceObj.name}</option>)
        }
        let deviceInfoContainer = [],
            deviceInfo
        if (this.state.currentIndex) {
            deviceInfo = this.getCurrentDevice()
            console.log(deviceInfo)
            deviceInfoContainer = [
                <div className="row">
                    <div className="col-md-6">
                        <p><span className="font-weight-bold">Manufacturer : </span>{deviceInfo.manufacturer}</p>
                        <p><span className="font-weight-bold">Model : </span>{deviceInfo.model}</p>
                    </div>
                    <div className="col-md-6">
                        <p><span className="font-weight-bold">Platform : </span>{deviceInfo.platform}</p>
                        <p><span className="font-weight-bold">Resolution : </span>{deviceInfo.resolution.height} * {deviceInfo.resolution.width}</p>
                    </div>
                </div>
            ]
        }

        return (
            <div>
                <div className="form-group">
                    <label htmlFor="listOfDevices">List of devices</label>
                    <select id="listOfDevices" class="form-control" onChange={this.deviceChangeHandler}>
                        {allDevices}
                    </select>
                </div>
                {deviceInfoContainer}
            </div>
        )
    }
}
//export Landing Component
export default Landing;