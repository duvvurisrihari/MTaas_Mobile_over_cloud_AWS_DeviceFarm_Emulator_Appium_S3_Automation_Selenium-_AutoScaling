import React, { Component } from 'react';

class Landing extends Component {

    render() {
        console.log(this.props.testObj)
        let testStatus
        let testResult
        if (['PENDING', 'PENDING_CONCURRENCY', 'PENDING_DEVICE'].includes(this.props.testObj.status)) {
            testStatus = <span className="text-info">{this.props.testObj.status}</span>
        } else if (['PROCESSING', 'SCHEDULING', 'PREPARING'].includes(this.props.testObj.status)) {
            testStatus = <span className="text-primary">{this.props.testObj.status}</span>
        } else if (this.props.testObj.status === 'testNING') {
            testStatus = <span className="text-warning">{this.props.testObj.status}</span>
        } else if (this.props.testObj.status === 'COMPLETED') {
            testStatus = <span className="text-success">{this.props.testObj.status}</span>
        } else if (this.props.testObj.status === 'STOPPING') {
            testStatus = <span className="text-danger">{this.props.testObj.status}</span>
        }


        if (this.props.testObj.result === 'PENDING') {
            testResult = <span className="text-info">{this.props.testObj.result}</span>
        } else if (this.props.testObj.result === 'PASSED') {
            testResult = <span className="text-success">{this.props.testObj.result}</span>
        } else if (this.props.testObj.result === 'WARNED') {
            testResult = <span className="text-warning">{this.props.testObj.result}</span>
        } else {
            testResult = <span className="text-danger">{this.props.testObj.result}</span>
        }

        return (
            <div className="border-bottom p-3">
                <h3 className="font-weight-light">Test {this.props.testIndex}: {this.props.testObj.name}</h3>
                <div className="row">
                    <div className="col-md-6"><h4 className="font-weight-light">Status: {testStatus}</h4></div>
                    <div className="col-md-6"><h4 className="font-weight-light">Result: {testResult}</h4></div>
                </div>

                {/* Results */}
                <div className="row">
                    <div className="col-md-6"><h5 className="font-weight-light">Tests passed: {this.props.testObj.counters.passed}</h5></div>
                    <div className="col-md-6"><h5 className="font-weight-light">Tests failed: {this.props.testObj.counters.failed}</h5></div>
                </div>
                <div className="row">
                    <div className="col-md-6"><h5 className="font-weight-light">Tests warned: {this.props.testObj.counters.warned}</h5></div>
                    <div className="col-md-6"><h5 className="font-weight-light">Tests errored: {this.props.testObj.counters.errored}</h5></div>
                </div>
                <div className="row">
                    <div className="col-md-6"><h5 className="font-weight-light">Tests stopped: {this.props.testObj.counters.stopped}</h5></div>
                    <div className="col-md-6"><h5 className="font-weight-light">Tests skipped: {this.props.testObj.counters.skipped}</h5></div>
                </div>
            </div>
        )
    }

}
//export Landing Component
export default Landing;