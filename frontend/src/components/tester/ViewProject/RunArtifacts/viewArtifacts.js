import React, { Component } from 'react';
import Header from '../../../common/header';
import Footer from '../../../common/footer';
import Navigation from '../../../common/navigation';
import ProjectNavbar from '../../../common/projectTesterNavbar';
import RunContainer from './runContainer';
import axios from 'axios';
import constants from '../../../../utils/constants';

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            projectObj: {},
            runDetails: null,
            allArtifacts: null,
            waitingMsg: <span className="text-warning"> Fetching... Please wait!</span>
        }
    }

    componentDidMount() {
        let runArn = this.props.location.search.substring(1)
        axios.get(`${constants.BACKEND_SERVER.URL}/project/details/${this.props.match.params.projectId}`)
            .then((response) => {
                this.setState({
                    arn: response.data.ARN,
                    projectObj: response.data
                })
            })
        axios.get(`${constants.BACKEND_SERVER.URL}/devicefarm/getRun?runArn=${runArn}`)
            .then((response) => {
                this.setState({
                    runDetails: response.data.run
                })
            })
        this.getArtifacts('FILE')
    }

    getArtifacts = (type) => {
        let runArn = this.props.location.search.substring(1)
        axios.get(`${constants.BACKEND_SERVER.URL}/devicefarm/listArtifacts?runArn=${runArn}&type=${type}`)
            .then((response) => {
                this.setState({
                    allArtifacts: response.data.allArtifacts,
                    waitingMsg: ""
                })
            })
    }

    artifactTypeChangeHandler = (e) => {
        this.setState({
            waitingMsg: <span className="text-warning"> Fetching... Please wait!</span>
        })
        this.getArtifacts(e.target.value)
    }

    render() {
        let allartifacts = [],
            index,
            artifactIndex
        for (index in this.state.allArtifacts) {
            if (this.state.allArtifacts[index].artifacts.length > 0) {
                for (artifactIndex in this.state.allArtifacts[index].artifacts) {
                    allartifacts.push(
                        <div className="row border p-2 text-break">
                            <div className="col-md-2">{this.state.allArtifacts[index].job}</div>
                            <div className="col-md-2">{this.state.allArtifacts[index].suite}</div>
                            <div className="col-md-2">{this.state.allArtifacts[index].test}</div>
                            <div className="col-md-2">{this.state.allArtifacts[index].artifacts[artifactIndex].name}</div>
                            <div className="col-md-2">{this.state.allArtifacts[index].artifacts[artifactIndex].type}</div>
                            <div className="col-md-2">
                                <a href={this.state.allArtifacts[index].artifacts[artifactIndex].url} target="_blank">
                                    <button className="w-100 btn btn-success">Download</button>
                                </a>
                            </div>
                        </div>
                    )
                }
            }
        }

        let runDetails
        if (this.state.runDetails) {
            runDetails = <RunContainer runObj={this.state.runDetails} projectId={this.props.match.params.projectId} />
        }
        return (
            <div>

                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                    <ProjectNavbar projectObj={this.state.projectObj} />
                    <div className="mt-2 mb-2 p-5 shadow">
                        {runDetails}
                        <div className="form-group mt-3">
                            <label>Type of artifacts you want to see {this.state.waitingMsg}</label>
                            <select onChange={this.artifactTypeChangeHandler} className="form-control">
                                <option value="FILE">File</option>
                                <option value="LOG">Log</option>
                                <option value="SCREENSHOT">Screenshots</option>
                            </select>
                        </div>
                        <div className="row bg-primary font-weight-bold text-white p-2">
                            <div className="col-md-2">Job</div>
                            <div className="col-md-2">Suite</div>
                            <div className="col-md-2">Test</div>
                            <div className="col-md-2">Name</div>
                            <div className="col-md-2">Type</div>
                        </div>
                        {allartifacts}
                    </div>

                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;