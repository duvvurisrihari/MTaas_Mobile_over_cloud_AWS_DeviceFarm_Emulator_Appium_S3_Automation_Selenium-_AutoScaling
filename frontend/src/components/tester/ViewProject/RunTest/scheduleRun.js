import React, { Component } from 'react';
import axios from 'axios';
import constants from '../../../../utils/constants';
import { FormGroup, Input, FormText, Label } from 'reactstrap';
import { Redirect } from 'react-router';

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            file: "",
            fileType: "ANDROID_APP",
            fileName: "",
            testType: "",
            testTypeName: "BUILTIN_FUZZ",
            allDevicePools: [],
            devicePoolARN: null,
            allUploads: [],
            currentUploadARN: null,
            successMsg: "",
            warningMsg: "",
            errMsg: "",
            maxTime: 5,
            redirectVar: [],
        }
        this.testPackageTypes = ['','','APPIUM_JAVA_JUNIT_TEST_PACKAGE','APPIUM_JAVA_TESTNG_TEST_PACKAGE','APPIUM_PYTHON_TEST_PACKAGE',
        'APPIUM_NODE_TEST_PACKAGE','APPIUM_RUBY_TEST_PACKAGE','CALABASH_TEST_PACKAGE','INSTRUMENTATION_TEST_PACKAGE',
        'UIAUTOMATION_TEST_PACKAGE','UIAUTOMATOR_TEST_PACKAGE','XCTEST_TEST_PACKAGE','XCTEST_UI_TEST_PACKAGE']
        this.testTypes = ['BUILTIN_FUZZ','BUILTIN_EXPLORER','APPIUM_JAVA_JUNIT','APPIUM_JAVA_TESTNG','APPIUM_PYTHON',
        'APPIUM_NODE','APPIUM_RUBY','CALABASH','INSTRUMENTATION','UIAUTOMATION','UIAUTOMATOR',
        'XCTEST','XCTEST_UI']
    }

    componentDidMount() {
        axios.get(`${constants.BACKEND_SERVER.URL}/devicefarm/listDevicePools?projectId=${this.props.projectId}`)
            .then((response) => {
                this.setState({
                    allDevicePools: response.data.devicePools,
                    devicePoolARN: response.data.devicePools[0].arn
                })
            })
    }

    applicationTypeChangeHandler = (e) => {
        this.setState({
            fileType: e.target.value
        })
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    applicationFileChangeHandler = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    testFileChangeHandler = (e) => {
        this.setState({
            testFile: e.target.files[0],
            testFileName: e.target.value
        })
    }

    testTypeChangeHandler = (e) => {
        const index = e.target.value
        this.setState({
            testType: this.testPackageTypes[index],
            testTypeName: this.testTypes[index]
        })
    }

    devicePoolChangeHandler = (e) => {
        this.setState({
            devicePoolARN: e.target.value
        })
    }

    timeChangeHandler = (e) => {
        this.setState({
            maxTime: e.target.value
        })
    }

    uploadChangeHandler = (e) => {
        this.setState({
            currentUploadARN: e.target.value
        })
    }

    scheduleRun = () => {
        this.setState({
            warningMsg: "Files are being uploaded. Do not refresh! You will be redirected automatically",
            successMsg: "",
            errMsg: "",
            redirectVar: []
        })

        let fd = new FormData();
        fd.append('name', this.state.name)
        fd.append('projectId', this.props.projectId)
        fd.append('userId', localStorage.getItem('281UserId'))
        fd.append('projectArn', this.props.arn)
        fd.append('fileType', this.state.fileType)
        fd.append('testType', this.state.testType)
        fd.append('testTypeName', this.state.testTypeName)
        fd.append('devicePoolArn', this.state.devicePoolARN)
        fd.append('jobTimeoutMinutes', this.state.maxTime)
        fd.append('file', this.state.file)
        fd.append('testFile', this.state.testFile)
        axios.post(`${constants.BACKEND_SERVER.URL}/devicefarm/schedulerun`, fd)
            .then((response) => {
                this.setState({
                    name: "",
                    file: "",
                    fileType: "ANDROID_APP",
                    fileName: "",
                    testFileName: "",
                    testTypeName: "BUILTIN_FUZZ",
                    successMsg: "Run created successfully",
                    warningMsg: "",
                    errMsg: "",
                    redirectVar: <Redirect to={`/tester/project/run/view/${this.props.projectId}`} />
                })
            })
            .catch((error) => {
                this.setState({
                    successMsg: "",
                    warningMsg: "",
                    errMsg: "Upload failed!",
                    redirectVar: []
                })
            })
    }

    render() {
        var index,
            allTypes = [],
            devicePools = [],
            devicePoolObj,
            allfileTypes = []
        for (index in this.testTypes) {
            allTypes.push(<option value={index}>{this.testTypes[index]}</option>)
        }
        for (index in this.state.allDevicePools) {
            devicePoolObj = this.state.allDevicePools[index]
            devicePools.push(<option value={devicePoolObj.arn}>{devicePoolObj.name}</option>)
        }
        const fileTypes = ['ANDROID_APP', 'IOS_APP', 'WEB_APP', 'EXTERNAL_DATA', 'APPIUM_JAVA_JUNIT_TEST_PACKAGE', 'APPIUM_JAVA_TESTNG_TEST_PACKAGE', 'APPIUM_PYTHON_TEST_PACKAGE', 'APPIUM_NODE_TEST_PACKAGE', 'APPIUM_RUBY_TEST_PACKAGE', 'APPIUM_WEB_JAVA_JUNIT_TEST_PACKAGE', 'APPIUM_WEB_JAVA_TESTNG_TEST_PACKAGE', 'APPIUM_WEB_PYTHON_TEST_PACKAGE', 'APPIUM_WEB_NODE_TEST_PACKAGE', 'APPIUM_WEB_RUBY_TEST_PACKAGE', 'CALABASH_TEST_PACKAGE', 'INSTRUMENTATION_TEST_PACKAGE', 'UIAUTOMATION_TEST_PACKAGE', 'UIAUTOMATOR_TEST_PACKAGE', 'XCTEST_TEST_PACKAGE', 'XCTEST_UI_TEST_PACKAGE', 'APPIUM_JAVA_JUNIT_TEST_SPEC', 'APPIUM_JAVA_TESTNG_TEST_SPEC', 'APPIUM_PYTHON_TEST_SPEC', 'APPIUM_NODE_TEST_SPEC', 'APPIUM_RUBY_TEST_SPEC', 'APPIUM_WEB_JAVA_JUNIT_TEST_SPEC', 'APPIUM_WEB_JAVA_TESTNG_TEST_SPEC', 'APPIUM_WEB_PYTHON_TEST_SPEC', 'APPIUM_WEB_NODE_TEST_SPEC', 'APPIUM_WEB_RUBY_TEST_SPEC', 'INSTRUMENTATION_TEST_SPEC', 'XCTEST_UI_TEST_SPEC']
        for (index in fileTypes) {
            allfileTypes.push(<option value={fileTypes[index]}>{fileTypes[index]}</option>)
        }
        return (
            <div>
                { this.state.redirectVar }
                <div className="form-group">
                    <label htmlFor="testName">Test Name</label>
                    <input type="text" id="testName" class="form-control" onChange={this.nameChangeHandler} value={this.state.name} />
                </div>
                <FormGroup>
                    <Label for="image">Application file</Label>
                    <Input type="file" name="image" id="image" multiple="" onChange={this.applicationFileChangeHandler} value={this.state.fileName} />
                    <FormText color="muted">
                        Upload your application file
                    </FormText>
                </FormGroup>
                <div className="form-group">
                    <label htmlFor="fileTypesAvailable">Type of application</label>
                    {/* <Select isMulti options = {devices} id="fileTypesAvailable" class="form-control" /> */}
                    <select id="fileTypesAvailable" class="form-control" onChange={this.applicationTypeChangeHandler} >
                        {allfileTypes}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="devicePool">Device pools available</label>
                    <select id="devicePool" class="form-control" onChange={this.devicePoolChangeHandler}>
                        {devicePools}
                    </select>
                </div>
                <FormGroup>
                    <Label for="image">Test file</Label>
                    <Input type="file" name="image" id="image" multiple="" onChange={this.testFileChangeHandler} value={this.state.testFileName} />
                    <FormText color="muted">
                        Upload your test file for the application
                    </FormText>
                </FormGroup>
                <div className="form-group">
                    <label htmlFor="testTypesAvailable">Type of test</label>
                    <select id="testTypesAvailable" class="form-control" onChange={this.testTypeChangeHandler}>
                        {allTypes}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="testTime">Number of minutes a test run executes before it times out</label>
                    <input type="text" id="testTime" class="form-control" onChange={this.timeChangeHandler} value={this.state.maxTime} />
                </div>
                <p className="text-success text-center">{this.state.successMsg}</p>
                <p className="text-warning text-center">{this.state.warningMsg}</p>
                <p className="text-danger text-center">{this.state.errMsg}</p>

                <button className="btn btn-primary w-100" onClick={this.scheduleRun}>Schedule run</button>

            </div>
        )
    }
}
//export Landing Component
export default Landing;