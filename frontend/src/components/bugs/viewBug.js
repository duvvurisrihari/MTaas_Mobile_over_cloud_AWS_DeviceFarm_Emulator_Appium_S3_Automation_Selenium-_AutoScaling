import React, { Component } from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import Navigation from '../common/navigation';
import {
    Card, CardText, CardBody, ModalBody, ModalFooter,
    CardTitle, Button, Form, Label,Modal
  } from 'reactstrap';
import axios from 'axios';
import Constants from '../../utils/constants';

class BugView extends Component {

    constructor(props){
        super(props);
        this.state = {
                bug : null,
                modalOpen : false,
                errMsg: '',
                successMsg: '',
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

    toggle = () => {
        console.log("2");
        this.setState(prevState => ({
          modalOpen: !prevState.modalOpen
        }));
      }

    deleteBug = (event) => {
        event.preventDefault();
        axios.delete(`${Constants.BACKEND_SERVER.URL}/bugs/deleteBug`, {
            data: {
              bugId: this.state.bug._id
            }
        })
        .then(response => {
            if (response.status === 200) {
                this.setState({
                    successMsg: 'Bug deleted successfully',
                    errMsg: '',
                });
                this.props.history.push(`/${localStorage.getItem('281UserType').toLowerCase()}/bugs/all`);
            }else {
                this.setState({
                    successMsg: '',
                    errMsg: 'Bug could not be deleted. please check bugId',
                });
            }
        })
        .catch(() => {
            this.setState({
                errMsg: 'Failed to delete bug',
                successMsg: '',
            });
        });
    }
    
   

    goToEditBug = (e) =>{
        e.preventDefault();
        this.props.history.push(`/${localStorage.getItem('281UserType').toLowerCase()}/bugs/editBug/${this.state.bug._id}`);
    }

    render() { 

        return (
            <div>

                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                    <div style = {{ display : "flex",  flexDirection :"row", justifyContent:"center"}}>
                        {this.state.bug && 
                        <Card style = {{  alignItems : "center" ,  width : "600px"}}>
                        <CardBody style={{background:"aliceblue" ,  width : "inherit", alignContent : "center" }}>
                            <CardTitle style={{paddingLeft : "40px",fontWeight: "bold", fontSize: "x-large", fontFamily: "none"}}>Bug Id : {this.state.bug._id}</CardTitle>
                            <hr/>
                            <Form>
                            <div style={{alignItems:"center"}}>
                            <div style = {{ display : "flex",  flexDirection :"row", padding : "40px"}}>
                                    <Label>Name:</Label>
                                    <div style={{paddingLeft : "40px"}}>
                                    <CardText>{this.state.bug.name}</CardText>
                                    </div>
                                </div>
                                <div style = {{ display : "flex",  flexDirection :"row", padding : "40px"}}>
                                    <Label>Subtitle:</Label>
                                    <div style={{paddingLeft : "40px"}}>
                                    <CardText>{this.state.bug.subject}</CardText>
                                    </div>
                                </div>
                                <div style = {{ display : "flex",  flexDirection :"row", padding : "40px"}}>
                                    Project Id:
                                    <div style={{paddingLeft : "28px"}}>
                                    <CardText>{this.state.bug.projectId}</CardText>
                                    </div>
                                </div>
                                <div style = {{ display : "flex",  flexDirection :"row", padding : "40px"}}>
                                    Status:
                                    <div style={{paddingLeft : "50px"}}>
                                    <CardText>{this.state.bug.status}</CardText>
                                    </div>
                                </div>
                                <div style = {{ display : "flex",  flexDirection :"row", padding : "40px"}}>
                                    Severity:
                                    <div style={{paddingLeft : "37px"}}>
                                    <CardText>{this.state.bug.severity}</CardText>
                                    </div>
                                </div>
                                <div style = {{ display : "flex",  flexDirection :"row", padding : "40px"}}>
                                    Tester:
                                    <div style = {{ paddingLeft : "48px"}} >
                                    <CardText>{this.state.bug.tester}</CardText>
                                    </div>
                                </div>
                            </div>
                            </Form>
                            <div  style={{display:"flex",flexDirection:"row", justifyContent:"space-evenly"}} >
                            <Button outline color="success" onClick={this.goToEditBug}>Update Bug</Button>

                            <Button outline color="danger" onClick={this.toggle}>Delete Bug</Button>
                            </div>
                            <div>
                                <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
                                    <ModalBody>
                                        Are you sure you want to delete the bug?
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" onClick={this.deleteBug}>Delete Bug</Button>
                                        <Button color="primary" onClick={this.toggle}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
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
                            </CardBody>
                        </Card>
                        }
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default BugView;