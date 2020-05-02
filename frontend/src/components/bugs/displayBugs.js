import React, {Component} from 'react';
import { Table, Badge, Card, CardBody, CardTitle} from 'reactstrap';
import {   withRouter} from 'react-router-dom';

class BugsDisplay extends Component {

    getStatus = (status) => {
        var pill = status === "Closed" ?  "secondary" 
                : status === "Resolved" ? "success"
                : status === "In Progress" ? "info"
                : status === "Open" ? "primary"
                : ""
        return pill;
    }

    getSeverity = (severity) => {
        var pill = severity === "High" ? "danger"
                : severity === "Medium" ? "warning"
                : "light";
        return pill;
    }

    render(){
        return ( 
            <div>
               { this.props.bugs && this.props.bugs.length!==0 &&
                <div>

            <Table bordered hidden={this.props.bugs==null}>
                <thead>
                    <tr style={{backgroundColor:"#cceeff"}}>
                    <th>BugId</th>
                    <th>Name</th>
                    <th>Subject</th>
                    <th>ProjectId</th>
                    <th>Status</th>
                    <th>Severity</th>
                    <th>Tester</th>
                    </tr>
                </thead>
                {
                    this.props.bugs && this.props.bugs.map( (bug) => {
                        var colourStatus =  this.getStatus(bug.status);
                        var colourSeverity = this.getSeverity(bug.severity);
                        return <tbody>
                                    <tr>
                                    <td>
                                        <a href= {`/${localStorage.getItem('281UserType').toLowerCase()}/bugs/viewBug/${bug['_id']}`} className="text-decoration-none text-dark">
                                        {bug._id}</a>
                                    </td>
                                    <td>{bug.name}</td>
                                    <td>{bug.subject}</td>
                                    <td>{bug.projectId}</td>
                                    <td><Badge color={colourStatus} pill>{bug.status}</Badge></td>
                                    <td><Badge color={colourSeverity} pill>{bug.severity}</Badge></td>
                                    <td>{bug.tester}</td>
                                    </tr>
                                </tbody>
                    })
                }
            </Table>
            <div hidden={this.props.bugs!=null} >
            <Card style = {{  alignItems : "center" ,  width : "600px"}}>
            <CardBody style={{background:"aliceblue" ,  width : "inherit", alignContent : "center" }}>
            <CardTitle style={{paddingLeft : "40px",fontWeight: "bold", fontSize: "x-large", fontFamily: "none"}}>
                No Bugs to Display 
            </CardTitle>
            </CardBody>
            </Card>
        </div>
            </div> }
            { (this.props.bugs===null || this.props.bugs.length===0 ) 
            && <h3 style={{paddingBottom:"40px"}}>No Bugs To Display</h3>}
        </div>
        )
    }
}

export default withRouter(BugsDisplay);