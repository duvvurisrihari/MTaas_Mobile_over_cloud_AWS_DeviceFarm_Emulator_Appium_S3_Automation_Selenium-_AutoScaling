import React, { Component } from 'react';
import { Col, FormGroup, Input, FormText } from 'reactstrap';
import axios from 'axios';
import constants from '../../../utils/constants'

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
            <div>
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
            </div>
        )
    }
}
//export Landing Component
export default Landing;