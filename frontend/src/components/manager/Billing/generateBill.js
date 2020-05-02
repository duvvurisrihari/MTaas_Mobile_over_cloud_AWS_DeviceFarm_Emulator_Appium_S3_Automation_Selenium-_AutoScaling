import React, { Component } from 'react';
import './generateBill.css';
import axios from 'axios';
import constants from '../../../utils/constants';

class Landing extends Component {

    constructor() {
        super()
        this.state = {
            numberOfFiles: null,
            numberOfDevicefarmRuns: null,
            numberOfMinutesinDeviceFarms: null,
            numberOfDevices: null,
            numberOfEmulatorRuns: null,
            managerObj: {}
        }
    }

    componentDidMount() {
        axios.get(`${constants.BACKEND_SERVER.URL}/manager/bill/${localStorage.getItem('281UserId')}`)
            .then((response) => {
                this.setState({
                    numberOfFiles: response.data.fileCount,
                    numberOfDevicefarmRuns: response.data.numberOfRuns,
                    numberOfDevices: response.data.numberOfDevices,
                    numberOfMinutesinDeviceFarms: response.data.devicefarmRuntime,
                    numberOfEmulatorRuns: response.data.numberOfEmulatorRuns,
                    managerObj: response.data.managerObj
                })
            })
    }

    render() {
        if (this.state.numberOfFiles === null) {
            return (
                <div className="text-center p-5 display-4">Generating bill...</div>
            )
        }

        let S3costs = this.state.numberOfFiles * 0.15 + 0.5
        let deviceFarmCosts = this.state.numberOfDevicefarmRuns * 0.6 + this.state.numberOfMinutesinDeviceFarms * 0.1 + this.state.numberOfDevices * 0.15
        let emulatorCosts = this.state.numberOfEmulatorRuns * 0.5
        let subTotal = S3costs + deviceFarmCosts + emulatorCosts + 3 + 5
        let tax = subTotal * 0.09
        let total = subTotal + tax

        return (
            <body>
                <div class="container" id="invoice">
                    <div>
                        <div class="class1" > 
                        <img src="helmet.png" height="240" width="450" alt="..." />
                        </div>
                        <div class="class2" ><b>
                            <pre align="right">         SJSU           1 Washington Sq</pre>
                            <pre align="right">(925)623-6605      San Jose, California</pre>
                            <pre align="right">                                  95110</pre>
                            <pre align="right"> United States</pre></b>
                        </div>
                        <div class="class3" />
                    </div>
                    <div class="row p-4">
                        <div className="col-md-3">
                            <p className="class5">Billed to</p>
                            <p className="font-weight-bold">{this.state.managerObj.name}</p>
                            <p className="font-weight-bold">CMPE281</p>
                            <p className="font-weight-bold">328 N Market St</p>
                            <p className="font-weight-bold">San Jose, California</p>
                            <p className="font-weight-bold">95110   </p>
                            <p className="font-weight-bold">United States</p>
                        </div>
                        <div className="col-md-3">
                            <div className="pb-2">
                                <p className="class5">Date of issue</p>
                                <p className="font-weight-bold">04/15/2020</p>
                            </div>
                            <div className="pt-2">
                                <p className="class5">Due Date</p>
                                <p className="font-weight-bold">04/29/2020</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="pb-2">
                                <p className="class5">Invoice Number</p>
                                <p className="font-weight-bold">0000001</p>
                            </div>
                            <div className="pt-2">
                                <p className="class5">Reference</p>
                                <p className="font-weight-bold">AWSMTaaS</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <p className="class5">Amount Due (USD)</p>
                            <p className="display-4 font-weight-bold">${total.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="class7" />

                    <div className="p-5">

                        <div className="row border-top border-bottom p-2 class5">
                            <div className="col-md-6 offset-md-2"><h5>Description</h5></div>
                            <div className="col-md-2"><h5>Cost</h5></div>
                        </div>

                        <div className="row border-top border-bottom p-2">
                            <div className="col-md-6 offset-md-2">
                                <h5>Charges for using S3 storage</h5>
                                <h5 className="font-weight-light">Base price: $0.50</h5>
                                <h5 className="font-weight-light">$0.15 * {this.state.numberOfFiles} files</h5>
                            </div>
                            <div className="col-md-2"><h2>${S3costs.toFixed(2)}</h2></div>
                        </div>

                        <div className="row border-top border-bottom p-2">
                            <div className="col-md-6 offset-md-2">
                                <h5>Charges for using real devices</h5>
                                <h5 className="font-weight-light">Base cost for each run: $0.60 ({this.state.numberOfDevicefarmRuns} runs)</h5>
                                <h5 className="font-weight-light">$0.10 * {this.state.numberOfMinutesinDeviceFarms} minutes of runtime</h5>
                                <h5 className="font-weight-light">$0.15 * {this.state.numberOfDevices} devices</h5>
                            </div>
                            <div className="col-md-2"><h2>${deviceFarmCosts.toFixed(2)}</h2></div>
                        </div>

                        <div className="row border-top border-bottom p-2">
                            <div className="col-md-6 offset-md-2">
                                <h5>Charges for using emulators</h5>
                                <h5 className="font-weight-light">$0.50 * {this.state.numberOfEmulatorRuns} runs</h5>
                            </div>
                            <div className="col-md-2"><h2>${emulatorCosts.toFixed(2)}</h2></div>
                        </div>

                        <div className="row border-top border-bottom p-2">
                            <div className="col-md-6 offset-md-2">
                                <h5>Base cost for EC2 instances</h5>
                            </div>
                            <div className="col-md-2"><h2>$3</h2></div>
                        </div>

                        <div className="row border-top border-bottom p-2">
                            <div className="col-md-6 offset-md-2">
                                <h5>Base cost for using the service</h5>
                            </div>
                            <div className="col-md-2"><h2>$5</h2></div>
                        </div>

                        <div className="row">
                            <div className="col-md-4 offset-md-4 border-top border-bottom"><h2>Subtotal</h2></div>
                            <div className="col-md-2 border-top border-bottom"><h2>${subTotal.toFixed(2)}</h2></div>
                        </div>

                        <div className="row">
                            <div className="col-md-4 offset-md-4 border-top border-bottom"><h2>Tax</h2></div>
                            <div className="col-md-2 border-top border-bottom"><h2>${tax.toFixed(2)}</h2></div>
                        </div>

                        <div className="row">
                            <div className="col-md-4 offset-md-4 border-top border-bottom"><h2>Total</h2></div>
                            <div className="col-md-2 border-top border-bottom"><h2>${total.toFixed(2)}</h2></div>
                        </div>

                        <div className="row">
                            <div className="col-md-4 offset-md-4 border-top border-bottom"><h2>Amount paid</h2></div>
                            <div className="col-md-2 border-top border-bottom"><h2>$0.00</h2></div>
                        </div>

                        <div className="row">
                            <div className="col-md-4 offset-md-4 border-top border-bottom class5"><h2>Amount Due (USD)</h2></div>
                            <div className="col-md-2 border-top border-bottom"><h2>${total.toFixed(2)}</h2></div>
                        </div>

                    </div>
                    <div>
                        <p class="class5"><b>Terms</b></p>
                        <p>Please pay by 04/29/2020 to avoid penalty</p>
                    </div>
                </div>
            </body>
        )
    }

}
//export Landing Component
export default Landing;