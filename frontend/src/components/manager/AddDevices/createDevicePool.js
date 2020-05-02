import React, { Component } from 'react';
import axios from 'axios';
import Constants from '../../../utils/constants'
import Select from 'react-select';

class Landing extends Component {

    constructor() {
        super()
        this.state = {
            name: "",
            description: "",
            allDevices: [],
            selectedDevices: [],
            deviceCount: 10,
            successMsg: "",
            errMsg: ""
        }
    }

    componentDidMount() {
        axios.get(`${Constants.BACKEND_SERVER.URL}/project/devices/all?projectId=${this.props.projectId}`)
            .then((response) => {
                this.setState({
                    allDevices: response.data.devices
                })
            })
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    descriptionChangeHandler = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    deviceCountChangeHandler = (e) => {
        this.setState({
            deviceCount: e.target.value
        })
    }

    onChangeMultiSelect = (opt) => {
        let allOptionsSelected = false
        if (opt !== null)
            allOptionsSelected = opt.length === this.state.allDevices.length
        else
            opt = []
        this.setState({
            checked: allOptionsSelected ? true : false,
            selectedDevices: opt
        });
    }


    createDevicePool = () => {
        if ("".localeCompare(this.state.name) === 0 ||
            "".localeCompare(this.state.name) === 0 ||
            isNaN(parseInt(this.state.deviceCount, 10)) ||
            parseInt(this.state.deviceCount, 10) < 1) {
            return
        }
        let arns = []
        for (var index in this.state.selectedDevices) {
            arns.push(this.state.selectedDevices[index].value)
        }
        const reqBody = {
            projectId: this.props.projectId,
            name: this.state.name,
            description: this.state.description,
            deviceARNs: JSON.stringify(arns),
            maxDevices: parseInt(this.state.deviceCount, 10)
        }
        axios.post(`${Constants.BACKEND_SERVER.URL}/devicefarm/createdevicepool`, reqBody)
            .then(() => {
                this.setState({
                    name: "",
                    description: "",
                    deviceCount: 10,
                    selectedDevices: [],
                    successMsg: "Created successfully",
                    errMsg: ""
                })
            })
            .catch(() => {
                this.setState({
                    successMsg: "",
                    errMsg: "Failed"
                })
            })
    }

    render() {

        let allDevices = [],
            index,
            deviceObj

        for (index in this.state.allDevices) {
            deviceObj = this.state.allDevices[index]
            allDevices.push({ label: deviceObj.name, value: deviceObj.arn })
        }

        return (
            <div>
                <div className="form-group">
                    <label htmlFor="poolName">Device Pool Name</label>
                    <input type="text" id="poolName" onChange={this.nameChangeHandler} value={this.state.name} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="poolName">Device Pool Description</label>
                    <input type="text" id="poolName" onChange={this.descriptionChangeHandler} value={this.state.description} className="form-control" />
                </div>

                <div className="form-group">
                    <label>Select Mobile Devices</label>
                    <Select isMulti onChange={this.onChangeMultiSelect} options={allDevices} value={this.state.selectedDevices} />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="poolName">Number of devices required</label>
                    <input type="text" id="poolName" onChange={this.deviceCountChangeHandler} value={this.state.deviceCount} className="form-control" />
                </div> */}
                <p className="text-success text-center">{this.state.successMsg}</p>
                <p className="text-danger text-center">{this.state.errMsg}</p>
                <div className="row">
                    <div className="col-md-6">
                        <button onClick={this.createDevicePool} className="btn btn-primary w-100">Create on-demand pool</button>
                    </div>
                    <div className="col-md-6">
                        <button onClick={this.createDevicePool} className="btn btn-primary w-100">Pre-book device pool</button>
                    </div>
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;