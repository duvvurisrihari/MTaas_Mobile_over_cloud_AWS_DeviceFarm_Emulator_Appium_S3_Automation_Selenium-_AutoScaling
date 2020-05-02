import React, { Component } from 'react';
import axios from 'axios';
import Constants from '../../../utils/constants';


class ListOfUsers extends Component {

    constructor () {
        super();
        this.state = {
            isAccepted: null
        }
    }

    acceptUser = () => {
        var reqData = {
            projectId : this.props.projectId,
            userId : this.props.userId
        }
        axios.post(`${Constants.BACKEND_SERVER.URL}/project/acceptUser`, reqData)
        .then((response) => {
            this.setState({
                isAccepted: true
            })
        })
    }

    rejectUser = () => {
        var reqData = {
            projectId : this.props.projectId,
            userId : this.props.userId
        }
        axios.post(`${Constants.BACKEND_SERVER.URL}/project/rejectUser`, reqData)
        .then((response) => {
            this.setState({
                isAccepted: false
            })
        })
    }

    render() {
        let userStatus = []
        if (this.state.isAccepted === null) {
            userStatus = [                
                <div className="col-md-8 row">
                    <div className="col-md-5"><button className="btn btn-success w-100" onClick = { this.acceptUser }>Accept</button></div>
                    <div className="col-md-5 offset-md-2"><button className="btn btn-danger w-100" onClick = { this.rejectUser }>Reject</button></div>
                </div>
            ]
        } else if (this.state.isAccepted === true) {
            userStatus = [                
                <div className="col-md-8 row">
                    <p className="text-success text-center">User request accepted</p>
                </div>
            ]
        } else if (this.state.isAccepted === false) {
            userStatus = [                
                <div className="col-md-8 row">
                    <p className="text-danger text-center">User request rejected</p>
                </div>
            ]
        } 
        return (
            <div className="row">
                <div className="col-md-4">
                    <h6>{ this.props.name }</h6>
                    <h6><span className="font-weight-light">{ this.props.email }</span></h6>
                </div>
                { userStatus }
            </div>
        )
    }

}


class Landing extends Component {

    constructor() {
        super();
        this.state = {
            requestedUsers: [],
        }
    }

    componentDidMount() {
        axios.get(`${Constants.BACKEND_SERVER.URL}/project/requested/${this.props.projectId}`)
        .then((response) => {
            console.log(response.data.requestedUsers)
            this.setState({
                requestedUsers: response.data.requestedUsers
            })
        })
    }

    render() {
        let listOfRequests = []
        if (this.state.requestedUsers.length > 0) {
            for (var index in this.state.requestedUsers) {
                let userObj = this.state.requestedUsers[index]
                listOfRequests.push(<ListOfUsers name = { userObj.name } email = { userObj.email } userId = { userObj._id } projectId = { this.props.projectId } />)
            }
        } else {
            listOfRequests.push(<h4 className="font-weight-light text-danger">There are no pending requests</h4>)
        }

        return (
            <div>
                <h1 className="display-4">Pending requests</h1>
                {listOfRequests}
            </div>
        )
    }
}
//export Landing Component
export default Landing;