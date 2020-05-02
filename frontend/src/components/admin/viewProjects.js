import React, { Component } from 'react';
import Header from './header';
import Navbar from './navigation';
import Footer from '../common/footer';
import axios from 'axios';
import constants from '../../utils/constants';

class ProjectRow extends Component {
    render() {
        return (
            <div className="m-3 p-3 shadow">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Name: <span className="font-weight-lighter">{this.props.projectObj.name}</span></h3>
                        <h3>Short Description: <span className="font-weight-lighter">{this.props.projectObj.shortDescription}</span></h3>
                        <h3>Company: <span className="font-weight-lighter">{this.props.projectObj.companyName}</span></h3>
                        <h3>Location: <span className="font-weight-lighter">{this.props.projectObj.city}</span></h3>
                        <h3>Technologies: <span className="font-weight-lighter">{this.props.projectObj.technologies}</span></h3>
                    </div>
                    <div className="col-md-6">
                        <h3 className="font-weight-light text-success">Accepted testers: <span className="font-weight-bold">{this.props.projectObj.acceptedTesters.length}</span></h3>
                        <h3 className="font-weight-light text-warning">Requested testers: <span className="font-weight-bold">{this.props.projectObj.requestedTesters.length}</span></h3>
                        <h3 className="font-weight-light text-danger">Rejected testers: <span className="font-weight-bold">{this.props.projectObj.rejectedTesters.length}</span></h3>
                        <h3 className="font-weight-light text-info">Bugs reported: <span className="font-weight-bold">{this.props.projectObj.bugsReported}</span></h3>
                        <h3 className="font-weight-light text-primary">Number of files: <span className="font-weight-bold">{this.props.projectObj.fileCount}</span></h3>
                    </div>
                </div>
            </div>
        )
    }
}

class Home extends Component {

    constructor() {
        super();
        this.state = {
            allProjects: []
        }
    }

    componentDidMount() {
        axios.get(`${constants.BACKEND_SERVER.URL}/admin/projects`)
            .then((response) => {
                this.setState({
                    allProjects: response.data
                })
            })
    }

    render() {

        let index,
            allProjects = []
        for (index in this.state.allProjects) {
            allProjects.push(<ProjectRow projectObj={this.state.allProjects[index]} />)
        }
        return (
            <div class="bg-white pl-5 pr-5">
                <Header />
                <Navbar />

                {allProjects}

                <Footer />
            </div>
        )
    }
}
//export Home Component
export default Home;