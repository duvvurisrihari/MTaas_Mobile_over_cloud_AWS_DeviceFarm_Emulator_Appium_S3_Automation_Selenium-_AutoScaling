import React, { Component } from 'react';
import Header from '../../../common/header';
import Footer from '../../../common/footer';
import Navigation from '../../../common/navigation';
import ProjectNavbar from '../../../common/projectTesterNavbar';
import JobContainer from './jobContainer';
import RunContainer from './runContainer';
import axios from 'axios';
import constants from '../../../../utils/constants';

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            projectObj: {},
            runDetails: null,
            allJobs: []
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
        axios.get(`${constants.BACKEND_SERVER.URL}/devicefarm/listJobs?runArn=${runArn}`)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    runDetails: response.data.runDetails,
                    allJobs: response.data.allJobs.jobs
                })
            })
    }

    render() {

        let allJobs = [],
            index
        for (index in this.state.allJobs) {
            allJobs.push(<JobContainer jobObj={this.state.allJobs[index]} jobIndex={parseInt(index, 10) + 1}/>)
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
                        {allJobs}
                    </div>

                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;