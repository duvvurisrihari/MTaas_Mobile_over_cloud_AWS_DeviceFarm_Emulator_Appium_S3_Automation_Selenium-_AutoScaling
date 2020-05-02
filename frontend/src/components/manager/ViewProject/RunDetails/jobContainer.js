import React, { Component } from 'react';
import ListSuites from './listSuites';

class Landing extends Component {

    constructor() {
        super()
        this.state = {
            viewSuites: false
        }
    }

    toggleDisplay = () => {
        this.setState({
            viewSuites: !this.state.viewSuites
        })
    }

    render() {

        let jobStatus
        let runResult
        if (['PENDING', 'PENDING_CONCURRENCY', 'PENDING_DEVICE'].includes(this.props.jobObj.status)) {
            jobStatus = <span className="text-info">{this.props.jobObj.status}</span>
        } else if (['PROCESSING', 'SCHEDULING', 'PREPARING'].includes(this.props.jobObj.status)) {
            jobStatus = <span className="text-primary">{this.props.jobObj.status}</span>
        } else if (this.props.jobObj.status === 'RUNNING') {
            jobStatus = <span className="text-warning">{this.props.jobObj.status}</span>
        } else if (this.props.jobObj.status === 'COMPLETED') {
            jobStatus = <span className="text-success">{this.props.jobObj.status}</span>
        } else if (this.props.jobObj.status === 'STOPPING') {
            jobStatus = <span className="text-danger">{this.props.jobObj.status}</span>
        }


        if (this.props.jobObj.result === 'PENDING') {
            runResult = <span className="text-info">{this.props.jobObj.result}</span>
        } else if (this.props.jobObj.result === 'PASSED') {
            runResult = <span className="text-success">{this.props.jobObj.result}</span>
        } else if (this.props.jobObj.result === 'WARNED') {
            runResult = <span className="text-warning">{this.props.jobObj.result}</span>
        } else {
            runResult = <span className="text-danger">{this.props.jobObj.result}</span>
        }

        let suitesButtonText,
            suiteContainer = []
        if (this.state.viewSuites) {
            suitesButtonText = "Hide suites"
            suiteContainer = <ListSuites jobArn = {this.props.jobObj.arn} />
        } else {
            suitesButtonText = "View suites"
        }
        return (
            <div className="border-bottom pt-2 pb-2">
                <h3 className="font-weight-light">Job {this.props.jobIndex}: { this.props.jobObj.name }</h3>
                <div className="row">
                    <div className="col-md-6"><h4 className="font-weight-light">Status: { jobStatus }</h4></div>
                    <div className="col-md-6"><h4 className="font-weight-light">Device name: { this.props.jobObj.device.name }</h4></div>
                </div>
                <div className="row">
                    <div className="col-md-6"><h4 className="font-weight-light">Result: { runResult }</h4></div>
                    <div className="col-md-6"><h4 className="font-weight-light">Device platform: { this.props.jobObj.device.platform }</h4></div>
                </div>

                {/* Results */}
                <div className="row">
                    <div className="col-md-6"><h5 className="font-weight-light">Tests passed: { this.props.jobObj.counters.passed }</h5></div>
                    <div className="col-md-6"><h5 className="font-weight-light">Tests failed: { this.props.jobObj.counters.failed }</h5></div>
                </div>
                <div className="row">
                    <div className="col-md-6"><h5 className="font-weight-light">Tests warned: { this.props.jobObj.counters.warned }</h5></div>
                    <div className="col-md-6"><h5 className="font-weight-light">Tests errored: { this.props.jobObj.counters.errored }</h5></div>
                </div>
                <div className="row">
                    <div className="col-md-6"><h5 className="font-weight-light">Tests stopped: { this.props.jobObj.counters.stopped }</h5></div>
                    <div className="col-md-6"><h5 className="font-weight-light">Tests skipped: { this.props.jobObj.counters.skipped }</h5></div>
                </div>
                <div className="row">
                    <div className="col-md-4 offset-md-8 text-center"><button className="w-75 btn btn-info" onClick={this.toggleDisplay}>{suitesButtonText}</button></div>
                </div>
                {suiteContainer}
            </div>
        )
    }

}
//export Landing Component
export default Landing;