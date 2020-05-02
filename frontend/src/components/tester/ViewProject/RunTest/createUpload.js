import React, { Component } from 'react';
import axios from 'axios';
import constants from '../../../../utils/constants';
import { FormGroup, Input, FormText, Label } from 'reactstrap';

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            file: "",
            type: "ANDROID_APP",
            fileName: ""
        }
    }

    typeChangeHandler = (e) => {
        this.setState({
            type: e.target.value
        })
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onChangeFileUpload = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    createUpload = () => {
        
        let fd = new FormData();
        fd.append('projectId', this.props.projectId)
        fd.append('userId', localStorage.getItem('281UserId'))
        fd.append('projectArn', this.props.arn)
        fd.append('type', this.state.type)
        fd.append('file', this.state.file)
        axios.post(`${constants.BACKEND_SERVER.URL}/devicefarm/createupload`, fd)
            .then((response) => {
                console.log(response)
                this.setState({
                    fileName: ""
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        const fileTypes = ['ANDROID_APP', 'IOS_APP', 'WEB_APP', 'EXTERNAL_DATA', 'APPIUM_JAVA_JUNIT_TEST_PACKAGE', 'APPIUM_JAVA_TESTNG_TEST_PACKAGE', 'APPIUM_PYTHON_TEST_PACKAGE', 'APPIUM_NODE_TEST_PACKAGE', 'APPIUM_RUBY_TEST_PACKAGE', 'APPIUM_WEB_JAVA_JUNIT_TEST_PACKAGE', 'APPIUM_WEB_JAVA_TESTNG_TEST_PACKAGE', 'APPIUM_WEB_PYTHON_TEST_PACKAGE', 'APPIUM_WEB_NODE_TEST_PACKAGE', 'APPIUM_WEB_RUBY_TEST_PACKAGE', 'CALABASH_TEST_PACKAGE', 'INSTRUMENTATION_TEST_PACKAGE', 'UIAUTOMATION_TEST_PACKAGE', 'UIAUTOMATOR_TEST_PACKAGE', 'XCTEST_TEST_PACKAGE', 'XCTEST_UI_TEST_PACKAGE', 'APPIUM_JAVA_JUNIT_TEST_SPEC', 'APPIUM_JAVA_TESTNG_TEST_SPEC', 'APPIUM_PYTHON_TEST_SPEC', 'APPIUM_NODE_TEST_SPEC', 'APPIUM_RUBY_TEST_SPEC', 'APPIUM_WEB_JAVA_JUNIT_TEST_SPEC', 'APPIUM_WEB_JAVA_TESTNG_TEST_SPEC', 'APPIUM_WEB_PYTHON_TEST_SPEC', 'APPIUM_WEB_NODE_TEST_SPEC', 'APPIUM_WEB_RUBY_TEST_SPEC', 'INSTRUMENTATION_TEST_SPEC', 'XCTEST_UI_TEST_SPEC']
        var index,
            allfileTypes = []
        for (index in fileTypes) {
            allfileTypes.push(<option value={fileTypes[index]}>{fileTypes[index]}</option>)
        }
        return (
            <div>
                <FormGroup>
                        <Label for="image" sm={2}>File</Label>
                        <Input type="file" name="image" id="image" multiple="" onChange={this.onChangeFileUpload} value = { this.state.fileName }/>
                        <FormText color="muted">
                            Upload File for your Project
                    </FormText>
                </FormGroup>
                <div className="form-group">
                    <label htmlFor="fileTypesAvailable">File Types</label>
                    {/* <Select isMulti options = {devices} id="fileTypesAvailable" class="form-control" /> */}
                    <select id="fileTypesAvailable" class="form-control" onChange={ this.typeChangeHandler } >
                        {allfileTypes}
                    </select>
                </div>

                <button className="btn btn-primary w-100" onClick={this.createUpload}>Create upload</button>

            </div>
        )
    }
}
//export Landing Component
export default Landing;