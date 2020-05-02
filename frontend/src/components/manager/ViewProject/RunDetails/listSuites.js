import React, { Component } from 'react';
import axios from 'axios';
import constants from '../../../../utils/constants';
import SuiteContainer from './suiteContainer';

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            allSuites: []
        }
    }

    componentDidMount() {
        let jobArn = this.props.jobArn
        axios.get(`${constants.BACKEND_SERVER.URL}/devicefarm/listSuites?jobArn=${jobArn}`)
            .then((response) => {
                this.setState({
                    allSuites: response.data.suites
                })
            })
    }

    render() {

        let allSuites = [],
            index
        for (index in this.state.allSuites) {
            allSuites.push(<SuiteContainer suiteObj={this.state.allSuites[index]} suiteIndex={parseInt(index, 10) + 1} />)
        }

        return (
            <div className="mt-5 mb-5 border">
                {allSuites}
            </div>
        )
    }
}

//export Landing Component
export default Landing;