import React, { Component } from 'react';
import Header from '../../common/header';
import Footer from '../../common/footer';
import Navigation from '../../common/navigation';
import ProjectNavbar from '../../common/projectManagerNavbar';
import axios from 'axios';
import constants from '../../../utils/constants';

class Landing extends Component {

    constructor() {
        super()
        this.state = {
            projectObj: null,

            numberOfFiles: 5,
            numberOfDevicefarmRuns: 13,
            numberOfMinutesinDeviceFarms: 7,
            numberOfDevices: 3,
            numberOfEmulatorRuns: 10,
            numberOfMinutesinEmulators: 0

        }
    }

    componentDidMount() {
        axios.get(`${constants.BACKEND_SERVER.URL}/project/bill/${this.props.match.params.projectId}`)
            .then((response) => {
                console.log(response)
                this.setState({
                    projectObj: response.data.projectObj,
                    numberOfFiles: response.data.fileCount,
                    numberOfDevicefarmRuns: response.data.numberOfRuns,
                    numberOfDevices: response.data.numberOfDevices,
                    numberOfMinutesinDeviceFarms: response.data.devicefarmRuntime,
                    numberOfEmulatorRuns: response.data.numberOfEmulatorRuns,
                    numberOfMinutesinEmulators: response.data.emulatorRuntime
                })
            })
    }

    render() {
        if (this.state.projectObj === null) {
            return (
                <div>
                    <Header />
                    <Navigation />
                    <p className="p-5 display-4 text-center">We are checking your usage...</p>
                </div>
            )
        }

        // let subTotal = 0
        let S3costs = this.state.numberOfFiles * 0.15 + 0.5
        let deviceFarmCosts = this.state.numberOfDevicefarmRuns * 0.6 + this.state.numberOfMinutesinDeviceFarms * 0.1 + this.state.numberOfDevices * 0.15
        let emulatorCosts = this.state.numberOfEmulatorRuns * 0.5 + this.state.numberOfMinutesinEmulators * 0.1;
        let subTotal = S3costs + deviceFarmCosts + emulatorCosts + 3 + 5

        return (
            <div>
                <Header />
                <Navigation />
                <ProjectNavbar projectObj={this.state.projectObj} />

                <div className="m-5 p-5 shadow">

                    <div className="row bg-secondary p-2 text-white">
                        <div className="col-md-2 offset-md-8"><h5>Cost</h5></div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 offset-md-2">
                            <h5>Charges for using S3 storage</h5>
                            <h5 className="font-weight-light">Base price: $0.50</h5>
                            <h5 className="font-weight-light">$0.15 * {this.state.numberOfFiles} files</h5>
                        </div>
                        <div className="col-md-2"><h2>${S3costs.toFixed(2)}</h2></div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 offset-md-2">
                            <h5>Charges for using real devices</h5>
                            <h5 className="font-weight-light">Base cost for each run: $0.60 ({this.state.numberOfDevicefarmRuns} runs)</h5>
                            <h5 className="font-weight-light">$0.10 * {this.state.numberOfMinutesinDeviceFarms} minutes of runtime</h5>
                            <h5 className="font-weight-light">$0.15 * {this.state.numberOfDevices} devices</h5>
                        </div>
                        <div className="col-md-2"><h2>${deviceFarmCosts.toFixed(2)}</h2></div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 offset-md-2">
                            <h5>Charges for using emulators</h5>
                            <h5 className="font-weight-light">$0.50 * {this.state.numberOfEmulatorRuns} runs</h5>
                            <h5 className="font-weight-light">$0.15 * {this.state.numberOfMinutesinEmulators} Minutes</h5>

                        </div>
                        <div className="col-md-2"><h2>${emulatorCosts.toFixed(2)}</h2></div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 offset-md-2">
                            <h5>Base cost for EC2 instances</h5>
                        </div>
                        <div className="col-md-2"><h2>$3</h2></div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 offset-md-2">
                            <h5>Base cost for using the service</h5>
                        </div>
                        <div className="col-md-2"><h2>$5</h2></div>
                    </div>

                    <div className="row bg-secondary p-2 text-white">
                        <div className="col-md-6 offset-md-2"><h5>Subtotal</h5></div>
                        <div className="col-md-2"><h2>${subTotal.toFixed(2)}</h2></div>
                    </div>

                </div>

                <Footer />
            </div>
        )
    }
}
//export Landing Component
export default Landing;