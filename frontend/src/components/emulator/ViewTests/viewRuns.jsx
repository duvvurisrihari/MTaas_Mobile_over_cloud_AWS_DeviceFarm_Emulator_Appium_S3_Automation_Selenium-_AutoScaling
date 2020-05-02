import React, { Component } from 'react';
import Header from '../../common/header';
import Footer from '../../common/footer';
import Navigation from '../../common/navigation';
import axios from 'axios';
import constants from '../../../utils/constants';
import Banner from './Banner/Banner'

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
        console.log(this.props.match.params.projectId);
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
                    <div>
                        <div class="row text-center bg-dark font-weight-bold mt-1">
                            <div class="col-md-4 p-2 "><a href={`/tester/project/view/${this.props.match.params.projectId}`} class="text-white font-weight-light">Back to Project</a></div>
                            <div class="col-md-2 p-2"><a href={`/tester/project/run/emulator/${this.props.match.params.projectId}`} class="text-white font-weight-light">Create run</a></div>
                            <div class="col-md-2 p-2"><a href={`/tester/project/run/viewemulator/${this.props.match.params.projectId}`} class="text-white font-weight-light">View runs</a></div>
                            <div class="col-md-2 p-2"></div>
                            <div class="col-md-2 p-2"></div>
                        </div>
                    </div>
                    <Banner bannerDetails={this.state.allRuns} />


                    <Footer />
                </div>
            </div>
        )
    }
}
export default ViewEmulatorRuns;