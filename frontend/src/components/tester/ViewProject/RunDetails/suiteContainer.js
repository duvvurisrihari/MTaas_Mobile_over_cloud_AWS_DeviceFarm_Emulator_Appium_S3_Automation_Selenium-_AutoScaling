import React, { Component } from 'react';
import ListTests from './listTests';

class Landing extends Component {

    constructor() {
        super()
        this.state = {
            viewTests: false
        }
    }

    toggleDisplay = () => {
        this.setState({
            viewTests: !this.state.viewTests
        })
    }

    render() {
        console.log(this.props.suiteObj)
        let suiteStatus
        let suiteResult
        if (['PENDING', 'PENDING_CONCURRENCY', 'PENDING_DEVICE'].includes(this.props.suiteObj.status)) {
            suiteStatus = <span className="text-info">{this.props.suiteObj.status}</span>
        } else if (['PROCESSING', 'SCHEDULING', 'PREPARING'].includes(this.props.suiteObj.status)) {
            suiteStatus = <span className="text-primary">{this.props.suiteObj.status}</span>
        } else if (this.props.suiteObj.status === 'suiteNING') {
            suiteStatus = <span className="text-warning">{this.props.suiteObj.status}</span>
        } else if (this.props.suiteObj.status === 'COMPLETED') {
            suiteStatus = <span className="text-success">{this.props.suiteObj.status}</span>
        } else if (this.props.suiteObj.status === 'STOPPING') {
            suiteStatus = <span className="text-danger">{this.props.suiteObj.status}</span>
        }


        if (this.props.suiteObj.result === 'PENDING') {
            suiteResult = <span className="text-info">{this.props.suiteObj.result}</span>
        } else if (this.props.suiteObj.result === 'PASSED') {
            suiteResult = <span className="text-success">{this.props.suiteObj.result}</span>
        } else if (this.props.suiteObj.result === 'WARNED') {
            suiteResult = <span className="text-warning">{this.props.suiteObj.result}</span>
        } else {
            suiteResult = <span className="text-danger">{this.props.suiteObj.result}</span>
        }
        let suitesButtonText,
            testContainer = []
        if (this.state.viewTests) {
            suitesButtonText = "Hide tests"
            testContainer = <ListTests suiteArn={this.props.suiteObj.arn} />
        } else {
            suitesButtonText = "View tests"
        }
        return (
            <div className="border-bottom p-3">
                <h3 className="font-weight-light">Suite {this.props.suiteIndex}: {this.props.suiteObj.name}</h3>
                <div className="row">
                    <div className="col-md-6"><h4 className="font-weight-light">Status: {suiteStatus}</h4></div>
                    <div className="col-md-6"><h4 className="font-weight-light">Result: {suiteResult}</h4></div>
                </div>

                {/* Results */}
                <div className="row">
                    <div className="col-md-6"><h5 className="font-weight-light">Tests passed: {this.props.suiteObj.counters.passed}</h5></div>
                    <div className="col-md-6"><h5 className="font-weight-light">Tests failed: {this.props.suiteObj.counters.failed}</h5></div>
                </div>
                <div className="row">
                    <div className="col-md-6"><h5 className="font-weight-light">Tests warned: {this.props.suiteObj.counters.warned}</h5></div>
                    <div className="col-md-6"><h5 className="font-weight-light">Tests errored: {this.props.suiteObj.counters.errored}</h5></div>
                </div>
                <div className="row">
                    <div className="col-md-6"><h5 className="font-weight-light">Tests stopped: {this.props.suiteObj.counters.stopped}</h5></div>
                    <div className="col-md-6"><h5 className="font-weight-light">Tests skipped: {this.props.suiteObj.counters.skipped}</h5></div>
                </div>
                <div className="row">
                    <div className="col-md-4 offset-md-8 text-center"><button className="w-75 btn btn-info" onClick={this.toggleDisplay}>{suitesButtonText}</button></div>
                </div>
                {testContainer}
            </div>
        )
    }

}
//export Landing Component
export default Landing;