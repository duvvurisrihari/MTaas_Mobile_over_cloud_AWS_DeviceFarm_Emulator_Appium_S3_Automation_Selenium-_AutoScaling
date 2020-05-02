import React, { Component } from 'react';
import DashboardCard from '../../common/Dashboard/card';
import axios from 'axios';
import constants from '../../../utils/constants';

class Home extends Component {

    constructor() {
        super()
        this.state = {
            totalPassed: "-",
            totalFailed: "-",
            activeRuns: "-",
            completedRuns: "-",
            devicesInActiveRuns: "-",
            averageDeviceFarmRunsPerTester: "-",
            averageEmulatorRunsPerTester: "-",
        }
    }

    componentDidMount() {
        axios.get(`${constants.BACKEND_SERVER.URL}/devicefarm/dashboardDetails?projectArn=${this.props.ARN}&projectId=${this.props.projectId}`)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    totalPassed: response.data.totalPassed,
                    totalFailed: response.data.totalFailed,
                    activeRuns: response.data.activeRuns,
                    completedRuns: response.data.completedRuns,
                    devicesInActiveRuns: response.data.devicesInActiveRuns,
                    averageDeviceFarmRunsPerTester: response.data.averageDeviceFarmRunsPerTester,
                    averageEmulatorRunsPerTester: response.data.averageEmulatorRunsPerTester
                })
            })
    }

    render() {

        return (
            <div>

                <div className="row mt-5">
                    <div className="col-md-4">
                        <DashboardCard heading="Test cases passed" count={this.state.totalPassed} background="bg-success" />
                    </div>
                    <div className="col-md-4">
                        <DashboardCard heading="Test cases failed" count={this.state.totalFailed} background="bg-danger" />
                    </div>
                    <div className="col-md-4">
                        <DashboardCard heading="Bugs reported" count="9" background="bg-warning" />
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-3">
                        <DashboardCard heading="Pre booked real devices" count="0" background="bg-success" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Devices being used in active runs" count={this.state.devicesInActiveRuns} background="bg-secondary" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Active runs on real devices" count={this.state.activeRuns} background="bg-primary" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Completed runs real devices" count={this.state.completedRuns} background="bg-warning" />
                    </div>
                </div>

                <div className="row mt-5 mb-5">
                    <div className="col-md-3">
                        <DashboardCard heading="Pre booked simulators" count="0" background="bg-success" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Simulators being used on-demand" count="2" background="bg-secondary" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Active runs on simulators" count="0" background="bg-primary" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Completed runs on simulators" count="3" background="bg-warning" />
                    </div>
                </div>

            </div>
        )
    }
}
//export Home Component
export default Home;