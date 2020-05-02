import React, { Component } from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import Navigation from '../common/navigation';
import {
    Card, CardText, CardBody,
    CardTitle, Button, Form, Input, Label,
    Dropdown, DropdownItem, DropdownMenu, DropdownToggle
  } from 'reactstrap';
import axios from 'axios';
import Constants from '../../utils/constants';

class EditBugView extends Component {

    constructor(props){
        super(props);
        this.state = {
            bug : null,
            dropdownOpenState: false,
            dropdownOpenSeverity: false
        }
    }

    componentDidMount() {
        axios.get(`${Constants.BACKEND_SERVER.URL}/bugs/viewBug/${this.props.match.params.bugId}`)
        .then((response) => {
            if (response.data != null) {
                this.setState({bug : response.data});
            }
        })
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
            bug: {
                ...prevState.bug,
                severity: value,
            },
            dropdownOpenSeverity: !prevState.dropdownOpenSeverity,
        }))
      }
    
      toggleState =() => {
        this.setState({
          dropdownOpenState: !this.state.dropdownOpenState
        });
      }

      toggleSeverity =() => {
        this.setState({
          dropdownOpenSeverity: !this.state.dropdownOpenSeverity
        });
      }

    changeStateValue = (e) => {
        var value = e.currentTarget.textContent;
        this.setState((prevState) => ({
            ...prevState,
            bug: {
                ...prevState.bug,
                status: value,
            },
            dropdownOpenState: !prevState.dropdownOpenState,
        }))
      }

      
    updateBug = (e) => {
        e.preventDefault();
        
        const bug = {
            name: this.state.bug.name,
            subject: this.state.bug.subject,
            projectId: this.state.bug.projectId,
            severity: this.state.bug.severity,
            status: this.state.bug.status,
            tester : this.state.bug.tester
        }
        axios.post(`${Constants.BACKEND_SERVER.URL}/bugs/updateBug/${this.props.match.params.bugId}`, bug)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        successMsg: 'Bug updated successfully',
                        errMsg: '',
                    });
                    this.props.history.push(`/${localStorage.getItem('281UserType').toLowerCase()}/bugs/all`);

                }
            })
            .catch(() => {
                this.setState({
                    errMsg: 'Failed to update bug',
                    successMsg: '',
                });
            });
        

    }
    
    render() { 
        return (
            <div>

                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                    <div style = {{ display : "flex",flexDirection :"row", justifyContent:"center"}}>
                        { this.state.bug && <Card style = {{  alignItems : "center" ,  width : "600px"}}>
                        <CardBody style={{background:"aliceblue" ,  width : "inherit", alignContent : "center" }}>
                            <CardTitle style={{paddingLeft : "40px",fontWeight: "bold", fontSize: "x-large", fontFamily: "none"}}>Bug Id : {this.state.bug._id}</CardTitle>
                            <hr/>
                            <Form>
                            <div style={{alignItems:"center"}}>
                            <div style = {{ display : "flex",  flexDirection :"row", padding : "40px"}}>
                                    <Label>Name:</Label>
                                    <div style={{paddingLeft : "40px"}}>
                                    <CardText >{this.state.bug.name}</CardText>
                                    </div>
                                </div>
                                <div style = {{ display : "flex",  flexDirection :"row", padding : "40px"}}>
                                    <Label>Subtitle:</Label>
                                    <div style={{paddingLeft : "40px"}}>
                                    <Input type="text" name="subtitle" id="subtitle" placeholder={this.state.bug.subject} onChange={this.changeHandler} />
                                    </div>
                                </div>
                                <div style = {{ display : "flex",  flexDirection :"row", padding : "40px"}}>
                                    Project Id:
                                    <div style={{paddingLeft : "28px"}}>
                                    <CardText>{this.state.bug.projectId} </CardText>
                                    </div>
                                </div>
                                <div style = {{ display : "flex",  flexDirection :"row", padding : "40px"}}>
                                    Status:
                                    <div style={{paddingLeft : "50px"}}>
                                    <Dropdown isOpen={this.state.dropdownOpenState} onClick={this.toggleState}>
                                        <DropdownToggle caret tag="span"
                                            data-toggle="dropdown"
                                            aria-expanded={this.state.dropdownOpenState}>{this.state.bug.status}</DropdownToggle>
                                        <DropdownMenu>
                                        <DropdownItem ><div onClick={this.changeStateValue}>Open</div></DropdownItem>
                                        <DropdownItem ><div onClick={this.changeStateValue}>In Progress</div></DropdownItem>
                                        <DropdownItem ><div onClick={this.changeStateValue}>Resolved</div></DropdownItem>
                                        <DropdownItem ><div onClick={this.changeStateValue}>Closed</div></DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                    </div>
                                </div>
                                <div style = {{ display : "flex",  flexDirection :"row", padding : "40px"}}>
                                    Severity:
                                    <div style={{paddingLeft : "37px"}}>
                                    <Dropdown isOpen={this.state.dropdownOpenSeverity} onClick={this.toggleSeverity}>
                                        <DropdownToggle caret tag="span"
                                            data-toggle="dropdown"
                                            aria-expanded={this.state.dropdownOpenSeverity}>{this.state.bug.severity}</DropdownToggle>
                                        <DropdownMenu>
                                        <DropdownItem ><div onClick={this.changeSeverityValue}>High</div></DropdownItem>
                                        <DropdownItem ><div onClick={this.changeSeverityValue}>Medium</div></DropdownItem>
                                        <DropdownItem ><div onClick={this.changeSeverityValue}>Low</div></DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>                                    
                                    </div>
                                </div>
                                <div style = {{ display : "flex",  flexDirection :"row", padding : "40px"}}>
                                    Tester:
                                    <div style = {{ paddingLeft : "50px"}} >
                                    <Input type="text" name="tester" id="tester" placeholder={this.state.bug.tester} onChange={this.changeHandler} />
                                    </div>
                                </div>
                            </div>
                            </Form>
                            <div style={{paddingLeft : "40px"}}>
                            <Button onClick = {this.updateBug}>Save Changes</Button>
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
                        </Card>}
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default EditBugView;