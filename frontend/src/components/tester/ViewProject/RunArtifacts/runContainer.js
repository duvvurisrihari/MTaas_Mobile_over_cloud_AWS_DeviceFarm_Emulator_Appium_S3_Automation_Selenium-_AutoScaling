import React, { Component } from 'react';

class Landing extends Component {

    render() {

        let runStatus
        let runResult
        if (['PENDING', 'PENDING_CONCURRENCY', 'PENDING_DEVICE'].includes(this.props.runObj.status)) {
            runStatus = <span className="text-info font-weight-bold">{this.props.runObj.status}</span>
        } else if (['PROCESSING', 'SCHEDULING', 'PREPARING'].includes(this.props.runObj.status)) {
            runStatus = <span className="text-primary font-weight-bold">{this.props.runObj.status}</span>
        } else if (this.props.runObj.status === 'RUNNING') {
            runStatus = <span className="text-warning font-weight-bold">{this.props.runObj.status}</span>
        } else if (this.props.runObj.status === 'COMPLETED') {
            runStatus = <span className="text-success font-weight-bold">{this.props.runObj.status}</span>
        } else if (this.props.runObj.status === 'STOPPING') {
            runStatus = <span className="text-danger font-weight-bold">{this.props.runObj.status}</span>
        }


        if (this.props.runObj.result === 'PENDING') {
            runResult = <span className="text-info font-weight-bold">{this.props.runObj.result}</span>
        } else if (this.props.runObj.result === 'PASSED') {
            runResult = <span className="text-success font-weight-bold">{this.props.runObj.result}</span>
        } else if (this.props.runObj.result === 'WARNED') {
            runResult = <span className="text-warning font-weight-bold">{this.props.runObj.result}</span>
        } else {
            runResult = <span className="text-danger font-weight-bold">{this.props.runObj.result}</span>
        }

        return (
            <div>
                <p className="display-4">{this.props.runObj.name}</p>
                <div className="row">
                    <div className="col-md-6">
                        <h5 className="font-weight-lighter">Type: {this.props.runObj.type}</h5>
                        <h5 className="font-weight-lighter">Platform: {this.props.runObj.platform}</h5>
                    </div>
                    <div className="col-md-6">
                        <h5 className="font-weight-lighter">Status: {runStatus}</h5>
                        <h5 className="font-weight-lighter">Result: {runResult}</h5>
                    </div>
                </div>
                <div className="row border">
                    <div className="col-md-2 bg-success text-white p-1 text-center font-weight-bold">Passed</div>
                    <div className="col-md-2 bg-danger text-white p-1 text-center font-weight-bold">Failed</div>
                    <div className="col-md-2 bg-warning text-dark p-1 text-center font-weight-bold">Warned</div>
                    <div className="col-md-2 bg-danger text-white p-1 text-center font-weight-bold">Errored</div>
                    <div className="col-md-2 bg-info text-dark p-1 text-center font-weight-bold">Stopped</div>
                    <div className="col-md-2 bg-primary text-white p-1 text-center font-weight-bold">Skipped</div>
                </div>
                <div className="row border">
                    <div className="col-md-2 bg-success text-white p-1 text-center font-weight-bold">{this.props.runObj.counters.passed}</div>
                    <div className="col-md-2 bg-danger text-white p-1 text-center font-weight-bold">{this.props.runObj.counters.failed}</div>
                    <div className="col-md-2 bg-warning text-dark p-1 text-center font-weight-bold">{this.props.runObj.counters.warned}</div>
                    <div className="col-md-2 bg-danger text-white p-1 text-center font-weight-bold">{this.props.runObj.counters.errored}</div>
                    <div className="col-md-2 bg-info text-dark p-1 text-center font-weight-bold">{this.props.runObj.counters.stopped}</div>
                    <div className="col-md-2 bg-primary text-white p-1 text-center font-weight-bold">{this.props.runObj.counters.skipped}</div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-4 offset-md-8">
                        <a href={`/tester/project/run/details/${this.props.projectId}?${this.props.runObj.arn}`}>
                            <button className="w-75 btn btn-light text-center">View project details</button>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;