import React, { Component } from 'react';
import Header from '../../../common/header';
import Footer from '../../../common/footer';
import Navigation from '../../../common/navigation';
import ProjectNavbar from '../../../common/projectManagerNavbar';
import axios from 'axios';
import constants from '../../../../utils/constants';
import Banner from '../../../emulator/ViewTests/Banner/Banner';

class ViewEmulatorRuns extends Component {

    constructor() {
        super();
        this.state = {
            arn: null,
            projectObj: {},
            allRuns: []
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
        // console.log(this.props.match.params.projectId);
        const req = { projectId: this.props.match.params.projectId }
        axios.post(`${constants.BACKEND_SERVER.URL}/emulators/getRuns`, req).then((res) => {

            this.setState({ allRuns: res.data });
            //   console.log(this.state.allRuns);
        })
    }



    render() {


        return (
            <div>

                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                    
                    <ProjectNavbar projectObj = { this.state.projectObj } />
                    <Banner bannerDetails={this.state.allRuns} />


                    <Footer />
                </div>
            </div>
        )
    }
}
export default ViewEmulatorRuns;