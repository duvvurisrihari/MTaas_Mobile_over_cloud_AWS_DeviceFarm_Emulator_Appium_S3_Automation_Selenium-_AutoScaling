import React, {Component} from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './AddProject.css';
import axios from 'axios';
import Constants from '../../../utils/constants';

class ProjectForm extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            shortDes: "",
            detDesc: "",
            compName: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            testCases: "",
            tech: "",
            selectedFile: "",
            filename: "",
            errMsg: "",
            successMsg: ""
        }
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        });
    }
    shortDesChangeHandler = (e) => {
        this.setState({
            shortDes: e.target.value
        });
    }
    detailedDesChangeHandler = (e) => {
        this.setState({
            detDesc: e.target.value
        });
    }
    compNameChangeHandler = (e) => {
        this.setState({
            compName: e.target.value
        });
    }
    addressChangeHandler = (e) => {
        this.setState({
            address: e.target.value
        });
    }
    cityChangeHandler = (e) => {
        this.setState({
            city: e.target.value
        });
    }
    stateChangeHandler = (e) => {
        this.setState({
            state: e.target.value
        });
    }
    zipChangeHandler = (e) => {
        this.setState({
            zip: e.target.value
        });
    }
    testCaseChangeHandler = (e) => {
        this.setState({
            testCases: e.target.value
        });
    }
    techChangeHandler = (e) => {
        this.setState({
            tech: e.target.value
        });
    }
    onChangeFileUpload = (e) => {
        this.setState({
            selectedFile: e.target.files[0],
            filename: e.target.value
        });
    }
    addProjHandler = () => {
        console.log(this.state)
        if (this.state.name === "" || this.state.shortDes === "" || this.state.testCases === "") {
            this.setState({
                errMsg: "Required fields are empty",
                successMsg: ""
            })
        } else {

            let fd = new FormData();
            fd.append('managerId', localStorage.getItem('281UserId'))
            fd.append('name', this.state.name)
            fd.append('shortDescription', this.state.shortDes)
            fd.append('detailedDescription', this.state.detDesc)
            fd.append('companyName', this.state.compName)
            fd.append('address', this.state.address)
            fd.append('city', this.state.city)
            fd.append('state', this.state.state)
            fd.append('zip', this.state.zip)
            fd.append('testCases', this.state.testCases)
            fd.append('technologies', this.state.tech)
            fd.append('file', this.state.selectedFile)
            
            const config = {
                headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'multipart/form-data'
                }
            };
            axios.post(`${Constants.BACKEND_SERVER.URL}/manager/addProject`, fd, config)
                .then(() => {
                    this.setState({
                        name: "",
                        shortDes: "",
                        detDesc: "",
                        compName: "",
                        address: "",
                        city: "",
                        state: "",
                        zip: "",
                        testCases: "",
                        tech: "",
                        selectedFile: "",
                        filename: "",
                        errMsg: "",
                        successMsg: "Project added!"
                    })
                })
            
            .catch((error) => { 
                console.log(error)
                this.setState({
                    errMsg: "Error occured",
                    successMsg: ""
                })
            })
    }

}
    render () {

        return (
            <Form>
                <h3> Add Project</h3>
                <br>
                </br>
                <Row form>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="projectname">Project Name</Label>
                            <Input type="text" name="projectname" onChange={this.nameChangeHandler} id="projectname" placeholder="Enter Project Name" value={ this.state.name }/>
                        </FormGroup>
                    </Col>
                    <Col md={8}>
                        <FormGroup>
                            <Label for="projectshort">Short Description</Label>
                            <Input type="text" name="projectshort" onChange={this.shortDesChangeHandler} id="projectshort" placeholder="Enter a brief description about this project"  value={ this.state.shortDes } />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label for="detaildesc"> Detailed Description</Label>
                    <Input type="textarea" name="detaildesc" onChange={this.detailedDesChangeHandler} id="detaildesc" placeholder="Enter a detailed description here"  value={ this.state.detDesc } />
                </FormGroup>
                <FormGroup>
                    <Label for="company">Company Name</Label>
                    <Input type="text" name="company" onChange={this.compNameChangeHandler} id="company" placeholder="Your Company Name"  value={ this.state.compName } />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleAddress2">Address</Label>
                    <Input type="textarea" name="text" onChange={this.addressChangeHandler} id="exampleText" placeholder="Where is the project based?"  value={ this.state.address } />
                </FormGroup>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleCity">City</Label>
                            <Input type="text" name="city" onChange={this.cityChangeHandler} id="exampleCity" placeholder='City'  value={ this.state.city } />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="exampleState">State</Label>
                            <Input type="text" name="state" onChange={this.stateChangeHandler} id="exampleState" placeholder='State'  value={ this.state.state } />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="exampleZip">Zip</Label>
                            <Input type="text" name="zip" onChange={this.zipChangeHandler} id="exampleZip" placeholder='Zip'  value={ this.state.zip } />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label for="tests">Test Cases</Label>
                    <Input type="textarea" name="tests" onChange={this.testCaseChangeHandler} id="tests" placeholder='Enter a few test cases'  value={ this.state.testCases } />
                </FormGroup>
                <FormGroup>
                    <Label for="company">technologies</Label>
                    <Input type="text" name="company" onChange={this.techChangeHandler} id="company" placeholder="Ex: React, Node, Python"  value={ this.state.tech } />
                </FormGroup>
                <FormGroup row>
                    <Label for="image" sm={2}>File</Label>
                    <Col sm={10}>
                        <Input type="file" name="image" id="image" multiple="" onChange={this.onChangeFileUpload} value = { this.state.filename } />
                        <FormText color="muted">
                            Upload File for your Project
                </FormText>
                    </Col>
                </FormGroup>
                <br></br><br></br>
                <p className="text-danger text-center">{ this.state.errMsg }</p>
                <p className="text-success text-center">{ this.state.successMsg }</p>
                <Button color="danger" onClick={this.addProjHandler} className="w-100"> Add project </Button>
            </Form>

        );
    }
}


class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = () => {

    }

    render() {
        return (
            <div className="mainDiv">
                <div className="navDiv">
                </div>
                <div className="listDiv">
                    <div>
                        <div>
                            <ProjectForm />
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}




export default AddProject;