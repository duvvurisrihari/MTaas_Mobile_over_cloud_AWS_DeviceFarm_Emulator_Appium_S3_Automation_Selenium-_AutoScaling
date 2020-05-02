import React, { Component } from 'react';
import axios from 'axios';
import constants from '../../../../utils/constants';

class Landing extends Component {

    stopRun = () => {
        axios.delete(`${constants.BACKEND_SERVER.URL}/devicefarm/stopRun?arn=${this.props.runObj.arn}`)
            .then(() => {
                this.props.updateHandler()
            })
    }

    deleteRun = () => {
		alert(`This will delete run from the project and its related artifacts`)
        axios.delete(`${constants.BACKEND_SERVER.URL}/devicefarm/deleteRun?arn=${this.props.runObj.arn}`)
            .then(() => {
                this.props.updateHandler()
            })
    }

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

        let projectStatus
        if (this.props.runObj.status === 'COMPLETED' || this.props.runObj.status === 'STOPPING') {
            projectStatus = [
                <h5 className="font-weight-lighter">Status: {runStatus}</h5>,
                <h5 className="font-weight-lighter">Result: {runResult}</h5>
            ]
        } else {
            projectStatus = [
                <h5 className="font-weight-lighter">Status: {runStatus}</h5>,
                <h5 className="font-weight-lighter"><button className="btn btn-danger w-50" onClick={this.stopRun}>Stop run</button></h5>
            ]
        }

        return (
            <div className="mt-2 mb-2 p-5 shadow">
                <p className="display-4">{this.props.runObj.name}<span className="text-primary"> - {this.props.runObj.userName}</span></p>
                <div className="row">
                    <div className="col-md-6">
                        <h5 className="font-weight-lighter">Type: {this.props.runObj.type}</h5>
                        <h5 className="font-weight-lighter">Platform: {this.props.runObj.platform}</h5>
                    </div>
                    <div className="col-md-6">
                        {projectStatus}
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
                    <div className="col-md-4">
                        <a href={`/manager/project/run/artifacts/${this.props.projectId}?${this.props.runObj.arn}`}>
                            <button className="w-75 btn btn-light text-center">View run artifacts</button>
                        </a>
                    </div>
                    <div className="col-md-4">
                        <a href={`/manager/project/run/details/${this.props.projectId}?${this.props.runObj.arn}`}>
                            <button className="w-75 btn btn-light text-center">View more details</button>
                        </a>
                    </div>
                    <div className="col-md-4">
                        <button className="w-100 btn btn-danger" onClick={this.deleteRun}>Delete this run</button>
                    </div>
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;