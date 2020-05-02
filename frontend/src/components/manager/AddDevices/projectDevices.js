import React, { Component } from 'react';
import Header from '../../common/header';
import Footer from '../../common/footer';
import Navigation from '../../common/navigation';
import ListDevicePool from './listDevicePools';
import CreateDevicePool from './createDevicePool';

class Landing extends Component {

    render() {

        return (
            <div>

                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />

                    <div className="row">
                        <div className="col-md-6">
                            <CreateDevicePool projectId={this.props.match.params.projectId} />
                        </div>
                        <div className="col-md-6">
                            <ListDevicePool projectId={this.props.match.params.projectId} />
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;