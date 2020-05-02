import React, { Component } from 'react';
import axios from 'axios';
import constants from '../../../../utils/constants';
import TestContainer from './testContainer';

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            allTests: []
        }
    }

    componentDidMount() {
        let suiteArn = this.props.suiteArn
        axios.get(`${constants.BACKEND_SERVER.URL}/devicefarm/listTests?suiteArn=${suiteArn}`)
            .then((response) => {
                this.setState({
                    allTests: response.data.tests
                })
            })
    }

    render() {

        let allTests = [],
            index
        for (index in this.state.allTests) {
            allTests.push(<TestContainer testObj={this.state.allTests[index]} testIndex={parseInt(index, 10) + 1} />)
        }

        return (
            <div className="mt-5 mb-5 border">
                {allTests}
            </div>
        )
    }
}

//export Landing Component
export default Landing;