import React, { Component } from 'react';
import { Col, FormGroup, Input, FormText } from 'reactstrap';
import axios from 'axios';
import constants from '../../../utils/constants'
import {  withRouter} from 'react-router-dom';

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            selectedFile: "",
            filename: "",
            successMsg: "",
            errMsg: ""
        }
    }

    goToBugsByProject = (e) =>{
        e.preventDefault();
        this.props.history.push(`/${localStorage.getItem('281UserType').toLowerCase()}/bugs/project/`+this.props.projectId);
    }

    onChangeFileUpload = (e) => {
        this.setState({
            selectedFile: e.target.files[0],
            filename: e.target.value
        });
    }

    uploadNewFile = () => {
        if (this.state.filename === "") {
            return
        }
        let fd = new FormData();
        fd.append('userId', localStorage.getItem('281UserId'))
        fd.append('projectId', this.props.projectId)
        fd.append('file', this.state.selectedFile)

        axios.post(`${constants.BACKEND_SERVER.URL}/project/uploadFile`, fd)
            .then(() => {
                this.setState({
                    filename: "",
                    successMsg: "Uploaded successfully",
                    errMsg: ""
                })
            })
            .catch(() => {
                this.setState({
                    successMsg: "",
                    errMsg: "Failed to upload"
                })
            })

    }

    render() {

        return (
            <div className="col-md-6">
                <h1 className="display-4">Infomation</h1>
                <FormGroup row>
                    <Col sm={8}>
                        <Input type="file" name="image" id="image" multiple="" onChange={this.onChangeFileUpload} value={this.state.filename} />
                        <FormText color="muted">Upload File for your Project</FormText>
                        <FormText color="danger">{this.state.errMsg}</FormText>
                        <FormText color="success">{this.state.successMsg}</FormText>
                    </Col>
                    <Col sm={4}>
                        <button className="btn btn-warning w-100" onClick={this.uploadNewFile}>Upload file</button>
                    </Col>
                </FormGroup>
                <div className="row mt-2 mb-2">
                    <button className="btn btn-danger w-100" onClick={this.goToBugsByProject}>Report Bugs</button>
                </div>
                <div className="row mt-2 mb-2">
                    <a href={`/tester/project/run/schedule/${this.props.projectId}`} className="w-100">
                        <button className="btn btn-success w-100">Run test on real devices</button>
                    </a>
                </div>
                <div className="row mt-2 mb-2">
                    <a href={`/tester/project/run/emulator/${this.props.projectId}`} className="w-100">
                        <button className="btn btn-info w-100">Run test on emulators</button>
                    </a>
                </div>
            </div>
        )
    }
}
//export Landing Component
export default withRouter(Landing);