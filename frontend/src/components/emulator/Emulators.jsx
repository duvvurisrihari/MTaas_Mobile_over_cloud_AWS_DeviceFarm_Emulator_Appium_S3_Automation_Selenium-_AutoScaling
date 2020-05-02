import React, { Component } from 'react';
import Header from '../../components/common/header'
import Footer from '../../components/common/footer'
import Navigation from '../common/navigation'
import CreateTest from '../emulator/CreateTest/CreateTest'
class Emulators extends Component {
    state = {}
    render() {
        return (
            <div>
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
                {/* <TesterNav /> */}
                <CreateTest {...this.props} projectId={this.props.match.params.projectId} />
                <Footer />
            </div>
        );
    }
}

export default Emulators;