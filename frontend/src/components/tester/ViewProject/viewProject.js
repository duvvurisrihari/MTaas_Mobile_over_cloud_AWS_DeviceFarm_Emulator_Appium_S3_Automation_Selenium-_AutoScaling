import React, {Component} from 'react';
import axios from 'axios';
import Constants from '../../../utils/constants';
import InfoContainer from './infoContainer';
import FileBrowser from './fileBrowser';

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            projectId: null,
            name: "",
            about: "",
            description: null,
            technologies: null,
            company: null,
            address: null,
            city: null,
            state: null,
            zipcode: null,
            testCases: null,
            createdTime: null,
            isMember: "No"
        }
    }

    componentDidMount() {
        axios.get(`${Constants.BACKEND_SERVER.URL}/project/details/${this.props.projectId}`)
        .then((response) => {
            var projectObj = response.data

            this.setState({
                projectId: projectObj._id,
                name: projectObj.name,
                about: projectObj.shortDescription,
                description: projectObj.detailedDescription,
                technologies: projectObj.technologies,
                company: projectObj.companyName,
                address: projectObj.address,
                city: projectObj.city,
                state: projectObj.state,
                zipcode: projectObj.zip,
                testCases: projectObj.testCases,
                createdTime: projectObj.createdTime
            })
        })

        
        axios.get(`${Constants.BACKEND_SERVER.URL}/users/project/details/${localStorage.getItem('281UserId')}/${this.props.projectId}`)
        .then((response) => {
            console.log(response.data)
            this.setState({
                isMember: response.data.status
            })
        })
    }

    joinProject = () => {
        var reqData = {
            projectId : this.state.projectId,
            userId : localStorage.getItem('281UserId')
        }
        axios.post(`${Constants.BACKEND_SERVER.URL}/users/project/join`, reqData)
        .then((response) => {
            console.log(response.data)
            this.setState({
                isMember: "Requested"
            })
        })
    }

    returnDisplay = (name, value) => {
        return <h6>{ name }: <span className="font-weight-light">{ value }</span></h6>
    }

    render(){

        let description,
        technologies,
        company,
        address,
        city,
        state,
        zipcode,
        infoContainer
        if (this.state.description) {
            description = this.returnDisplay('Description', this.state.description)
        }
        if (this.state.technologies) {
            technologies = this.returnDisplay('Technologies', this.state.technologies)
        }
        if (this.state.company) {
            company = this.returnDisplay('Company', this.state.company)
        }
        if (this.state.address) {
            address = this.returnDisplay('Address', this.state.address)
        }
        if (this.state.city) {
            city = this.returnDisplay('City', this.state.city)
        }
        if (this.state.state) {
            state = this.returnDisplay('State', this.state.state)
        }
        if (this.state.zipcode) {
            zipcode = this.returnDisplay('Zipcode', this.state.zipcode)
        }


        if (this.state.isMember === "No") {
            infoContainer = 
            <div className="col-md-6">
                <button className="btn btn-primary w-100" onClick={ this.joinProject }><h1 className="display-4">Join Project</h1></button>
            </div>
        } else if (this.state.isMember === "Accepted") {
            infoContainer = <InfoContainer projectId = { this.props.projectId } />

        } else if (this.state.isMember === "Requested") {
            infoContainer = 
            <div className="col-md-6">
                <h1 className="display-4 text-warning">You have requested to join the project</h1>
            </div>
        } else if (this.state.isMember === "Rejected") {
            infoContainer = 
            <div className="col-md-6">
                <h1 className="display-4 text-danger">Rejected</h1>
            </div>
        }

        return(
            <div className="p-5 shadow">
                <div className="row border-bottom pb-4">
                    <div className="col-md-6">

                        <h1 className="display-4">{ this.state.name }</h1>
                        <h4 className="font-weight-light">{ this.state.about }</h4>

                        { description }
                        { technologies }
                        { company }
                        { address }
                        { city }
                        { state }
                        { zipcode }
                        { this.returnDisplay('Test Cases', this.state.testCases) }

                    </div>

                    { infoContainer }

                </div>
                <FileBrowser projectId = { this.props.projectId } />
            </div>
        )
    }
}
//export Landing Component
export default Landing;