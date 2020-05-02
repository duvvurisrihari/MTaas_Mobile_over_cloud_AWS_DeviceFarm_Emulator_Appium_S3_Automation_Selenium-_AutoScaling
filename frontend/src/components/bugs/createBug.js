import React, { Component } from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import Navigation from '../common/navigation';
import {
    Card, CardBody, Dropdown,
    CardTitle, Button, Form, Input, Label, DropdownToggle, DropdownMenu, DropdownItem, CardText
  } from 'reactstrap';
import axios from 'axios';
import Constants from '../../utils/constants';



class CreateBugView extends Component {

    constructor(props){
        super(props);
        this.state = {
                subject :  null,
                projectId : this.props.match.params.projectId,
                status : "Open",
                severity : null,
                tester : localStorage.getItem('281Username'),
                name: null,
                dropdownOpen: true,
                errMsg: '',
                successMsg: '',
                dropdownOpenState: false,
                dropdownOpenSeverity: false

        }
    }

    toggleSeverity =() => {
        this.setState({
          dropdownOpenSeverity: !this.state.dropdownOpenSeverity
        });
      }

    changeHandler = (event)  => {
        let key = event.target.name;
        let value = event.target.value;
        this.setState({ [key]: value });
      }

    changeSeverityValue = (event) => {
    event.preventDefault();
    var value = event.currentTarget.textContent;
    this.setState((prevState) => ({
        ...prevState,
        severity: value,
        dropdownOpenSeverity: !prevState.dropdownOpenSeverity,
    }))
    }

    createBug = (e) => {
        e.preventDefault();
        const bug = {
            name: this.state.name,
            subject: this.state.subject,
            projectId: this.props.match.params.projectId,
            severity: this.state.severity,
            status: this.state.status,
            tester : this.state.tester
        }
        axios.post(Constants.BACKEND_SERVER.URL + "/bugs/createBug", bug)
            .then((response) => {
                this.setState({
                    subject: null,
                    severity: null,
                    name: null
                });
                if (response.status === 201) {
                    this.setState({
                        successMsg: 'Bug created successfully',
                        errMsg: '',
                    });
                } else if (response.status === 409) {
                    this.setState({
                        successMsg: '',
                        errMsg: 'Bug with name already exists',
                    });
                }
            })
            .catch(() => {
                this.setState({
                    errMsg: 'Failed to create bug',
                    successMsg: '',
                });
            });

    }

    goToDashBoard = (e) => {
        e.preventDefault();
        this.props.history.push(`/${localStorage.getItem('281UserType').toLowerCase()}/bugs/all`);
    }

    render() { 

        return (
            <div>

                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                    <div style = {{ display : "flex",flexDirection :"row", justifyContent:"center"}}>
                        <Card style = {{  alignItems : "center" ,  width : "600px"}}>
                        <CardBody style={{background:"aliceblue" ,  width : "inherit", alignContent : "center" }}>
                            <CardTitle style={{paddingLeft : "40px",fontWeight: "bold", fontSize: "x-large", fontFamily: "none"}}>Create a bug</CardTitle>
                            <hr/>
                            <Form>
                            <div style={{alignItems:"center"}}>
                            <div style = {{ display : "flex",  flexDirection :"row", padding : "40px"}}>
                                    <Label>Name:</Label>
                                    <div style={{paddingLeft : "40px"}}>
                                    <Input type="text" name="name" id="name"  onChange={this.changeHandler} value = {this.state.name==null ? "" : this.state.name} required/> 
                                    </div>
                                </div>
                                <div style = {{ display : "flex",  flexDirection :"row", padding : "40px"}}>
                                    <Label>Subject:</Label>
                                    <div style={{paddingLeft : "40px"}}>
                                    <Input type="text" name="subject" id="subject" value = {this.state.subject==null ? "" : this.state.subject}  onChange={this.changeHandler} required/>
                                    </div>
                                </div>
                                <div style = {{ display : "flex",  flexDirection :"row", padding : "40px"}}>
                                    <Label>Project Id:</Label>
                                    <div style={{paddingLeft : "28px"}}>
                                    <CardText id="projectId" >{this.props.match.params.projectId}</CardText>
                                    </div>
                                </div>
                                <div style = {{ display : "flex",  flexDirection :"row", padding : "40px"}}>
                                    Severity:
                                    <div style={{paddingLeft : "37px"}}>
                                    <Dropdown isOpen={this.state.dropdownOpenSeverity} toggle={this.toggleSeverity}>
                                        <DropdownToggle caret tag="span"
                                            data-toggle="dropdown"
                                            aria-expanded={this.state.dropdownOpenSeverity}>{this.state.severity==null ? "Select Severity" : this.state.severity}</DropdownToggle>
                                        <DropdownMenu>
                                        <DropdownItem ><div onClick={this.changeSeverityValue}>High</div></DropdownItem>
                                        <DropdownItem ><div onClick={this.changeSeverityValue}>Medium</div></DropdownItem>
                                        <DropdownItem ><div onClick={this.changeSeverityValue}>Low</div></DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>                                    
                                    </div>
                                </div>
                            </div>
                            </Form>
                            <div style={{paddingLeft : "40px",display:"flex",flexDirection:"row",justifyContent:"space-evenly"}}>
                            <Button onClick={this.createBug}>Create Bug</Button>
                            <Button onClick={this.goToDashBoard} > Go To Dashboard</Button>
                            <div className="text-center">
                                    <p className="text-danger">
                                        {' '}
                                        {this.state.errMsg}
                                        {' '}
                                    </p>
                                    <p className="text-success">
                                        {' '}
                                        {this.state.successMsg}
                                        {' '}
                                    </p>
                                </div>
                            </div>
                            </CardBody>
                        </Card>
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default CreateBugView;