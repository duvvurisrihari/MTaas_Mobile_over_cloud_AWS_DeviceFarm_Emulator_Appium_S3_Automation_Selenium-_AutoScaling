import React, { Component } from 'react';
import '../AddProject/AddProject.css'
import axios from 'axios';
import Constants from '../../../utils/constants';
import './fileBrowser.styles.css'

class ProjectFile extends Component {

    deleteFile = () => {
        let reqData = {
            userId: localStorage.getItem('281UserId'),
            projectId: this.props.projectId,
            filename: this.props.fileObj.name
        }
        axios.post(`${Constants.BACKEND_SERVER.URL}/manager/deleteFile`, reqData)
        .then(() => {
            this.props.fetchFiles();
        })
    }

    render() {
        var filename = this.props.fileObj.name.split("/");
        return(
            <div className="row mt-2">
                <div className="col-md-6">{filename[filename.length - 1]}</div>
                <div className="col-md-3">
                    <a href={this.props.fileObj.url} target="_blank"><button className="btn btn-success">Download this file</button></a>
                </div>
                <div className="col-md-3">
                    <button className="btn btn-danger" onClick={this.deleteFile}>Delete this file</button>
                </div>
            </div>

        )
    }
}

class Landing extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            allProjCards: []
        }
    }

    componentDidMount() {
        this.fetchFiles();
    }

    fetchFiles = () => {
        axios.get(`${Constants.BACKEND_SERVER.URL}/project/filesInProject/${this.props.projectId}/${localStorage.getItem('281UserId')}`)
            .then((response) => {
                console.log(response.data);
                this.setState({ allProjCards: response.data })
            })
            .catch((error) => {
                console.log(error)
                this.setState({
                    errMsg: "Error occured",
                    successMsg: ""
                })
            })
    }


    render() {

        let allProjCards = [],
            files
        for (var userId in this.state.allProjCards) {
            files = []
            for (var index in this.state.allProjCards[userId].files) {
                files.push(<ProjectFile projectId={this.props.projectId} fetchFiles={this.fetchFiles} fileObj={this.state.allProjCards[userId].files[index]} />)
            }
            if (files.length > 0) {
                allProjCards.push(
                    <div className="p-5 border-bottom">
                        <h4>{this.state.allProjCards[userId].name}<span className="font-weight-light">(User ID: {userId})</span></h4>
                        {files}
                    </div>
                )
            }
        }

        return (
            <div className="mt-1 pt-4">
                <h3>Files in this project</h3>
                {allProjCards}
            </div>
        )
    }
}
//export Landing Component
export default Landing;