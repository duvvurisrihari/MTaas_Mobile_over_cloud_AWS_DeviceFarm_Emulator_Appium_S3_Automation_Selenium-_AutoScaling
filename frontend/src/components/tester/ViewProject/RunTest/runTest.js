import React, { Component } from 'react';
import Header from '../../../common/header';
import Footer from '../../../common/footer';
import Navigation from '../../../common/navigation';
import ProjectNavbar from '../../../common/projectTesterNavbar';
import axios from 'axios';
import constants from '../../../../utils/constants';
// import CreateUpload from './createUpload';
import ScheduleRun from './scheduleRun';

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            arn : null,
            projectObj: {}
        }
    }

    componentDidMount() {
        axios.get(`${constants.BACKEND_SERVER.URL}/project/details/${this.props.match.params.projectId}`)
            .then((response) => {
                this.setState({
                    arn : response.data.ARN,
                    projectObj: response.data
                })
            })
    }

    render() {

        let scheduleRunDisplay = []
        if (this.state.arn) {
            scheduleRunDisplay = <ScheduleRun arn = { this.state.arn } projectId = { this.props.match.params.projectId }/>
        }
        return (
            <div>

                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                    <ProjectNavbar projectObj = { this.state.projectObj } />
                    
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            { scheduleRunDisplay }
                        </div>
                        {/* <div className="col-md-6">
                            <CreateUpload arn = { this.state.arn } projectId = { this.props.match.params.projectId } />                            
                        </div> */}
                    </div>


                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;