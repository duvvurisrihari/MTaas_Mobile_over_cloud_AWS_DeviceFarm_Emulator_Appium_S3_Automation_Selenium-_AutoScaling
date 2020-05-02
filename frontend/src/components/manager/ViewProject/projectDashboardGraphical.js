import React, { Component } from 'react';
import axios from 'axios';
import constants from '../../../utils/constants';
import { VictoryPie, VictoryChart, VictoryBar, VictoryTheme } from 'victory'
import './projectDashboard.css'

class Home extends Component {

    constructor() {
        super()
        this.state = {
            totalPassed: "",
            totalFailed: "",
            activeRuns: "",
            completedRuns: "",
            devicesInActiveRuns: "",
            averageDeviceFarmRunsPerTester: "",
            averageEmulatorRunsPerTester: "",
            bugStats: {

            }
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


        axios.get(`${constants.BACKEND_SERVER.URL}/bugs/getBugStatsByProject/${this.props.projectId}`)
            .then(response => {
                this.setState({ bugStats: response.data });
                console.log(this.state.bugStats);
                //should print 
                // {
                //     "total": 6,
                //     "open": 5,
                //     "closed": 1,
                //     "severity": {
                //         "high": 2,
                //         "medium": 3,
                //         "low": 1
                //     }
                // }
                // HANDLE response here
            })
            .catch(err => {
                console.log(err);
                let data = {
                    "total": 0,
                    "open": 0,
                    "closed": 0,
                    "severity": {
                        "high": 0,
                        "medium": 0,
                        "low": 0
                    }
                }
                this.setState({ bugStats: data });
            })
    }

    render() {
        let displaygraphs
        if (this.state.completedRuns > 0 && this.state.averageDeviceFarmRunsPerTester > 0 && this.state.averageEmulatorRunsPerTester > 0) {
            displaygraphs =
                <div className="dashboardGraphical">

                    <div className="pieChart" style={{ textAlign: "center" }}>
                        <p className='display-4'>Run Details</p>
                        <svg width={450} height={450}>
                            <VictoryPie
                                standalone={false}
                                animate={{
                                    duration: 2000,
                                    onLoad: { duration: 1000 }
                                }}
                                width={400} height={400}
                                innerRadius={100}
                                colorScale={["#a7d930", "#e42024", "#507b00", '#282f6c']}
                                padAngle={({ datum }) => datum.y}
                                data={[
                                    { x: 1, y: this.state.totalPassed, label: "Passed" },
                                    { x: 2, y: this.state.totalFailed, label: "Failed" },



                                ]}
                            />
                        </svg>
                    </div>
                    <div className="pieChart" style={{ textAlign: "center" }}>
                        <p className='display-4'>Run Status</p>
                        <svg width={450} height={450}>
                            <VictoryPie
                                standalone={false}
                                animate={{
                                    duration: 2000,
                                    onLoad: { duration: 1000 }
                                }}
                                width={400} height={400}
                                innerRadius={100}
                                colorScale={["#507b00", '#282f6c']}
                                padAngle={({ datum }) => datum.y}
                                data={[

                                    { x: 1, y: this.state.activeRuns, label: "Active" },
                                    { x: 2, y: this.state.completedRuns, label: "Completed" },


                                ]}
                            />
                        </svg>
                    </div>
                    <div className="barChart" style={{ textAlign: "center" }}>
                        <p className='display-4'>Average Runs</p>
                        {/* <svg width={400} height={400}> */}
                        <VictoryChart
                            theme={VictoryTheme.material}
                            domainPadding={{ x: 15 }}
                            width={400} height={400}
                            alignment="start"
                            animate={{
                                duration: 2000,
                                onLoad: { duration: 1000 }
                            }}
                            sortKey="x"
                        >
                            <VictoryBar horizontal
                                width={400} height={400}
                                style={{
                                    data: { fill: "#507b00" },
                                    labels: {
                                        fontSize: 15,
                                    }
                                }}

                                data={[
                                    { x: 1, y: this.state.averageDeviceFarmRunsPerTester, label: "Avg Device farm runs" },
                                    { x: 2, y: this.state.averageEmulatorRunsPerTester, label: "Avg Emulator runs" },
                                    { x: 3, y: (this.state.averageEmulatorRunsPerTester + this.state.averageDeviceFarmRunsPerTester), label: "Total runs" }

                                ]}
                            />
                        </VictoryChart>
                        {/* </svg> */}
                    </div>
                </div>
        }
        else {
            displaygraphs = <p className="display-4">No Runs to show</p>
        }
        console.log(this.state);
        return (

            <div className="outerdiv">
                {displaygraphs}
            </div>
        )
    }
}
//export Home Component
export default Home;