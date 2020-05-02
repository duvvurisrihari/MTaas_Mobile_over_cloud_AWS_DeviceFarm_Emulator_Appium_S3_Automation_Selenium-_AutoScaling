import  React, {Component} from 'react';
import {Card, CardTitle} from 'reactstrap';
import Header from '../common/header';
import Footer from '../common/footer';
import Navigation from '../common/navigation';
import axios from 'axios';
import Constants from '../../utils/constants';


class BugStats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectId : "5e8fabd02d11df46cc4c69a5",
            bugStats : {

            }
        };
      }

    componentDidMount() {
        axios.get(`${Constants.BACKEND_SERVER.URL}/bugs/getBugStatsByProject/${this.state.projectId}`)
        .then(response =>{
            this.setState({bugStats:response.data});
            console.log(this.state.bugStats);
            //should print 
            // {
            //     "total": 6,
            //     "open": 5,
            //     "closed": 1,
            //     "severity": {
            //         "high": 2,
            //         "medium": 3,
            //         "low": 1
            //     }
            // }
            // HANDLE response here
        })
        .catch(err => {
            console.log(err);
            let data =  {
                    "total": 0,
                    "open": 0,
                    "closed": 0,
                    "severity": {
                        "high": 0,
                        "medium": 0,
                        "low": 0
                    }
                }
            this.setState({bugStats:data});
        })
    }

    render(){

        return(
            <div>
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                    <div style={{display : "flex",flexDirection :"column",paddingTop:"50px"}}>
                        <Card>
                            <CardTitle>Total : {this.state.bugStats.total}</CardTitle>
                            <CardTitle>Open : {this.state.bugStats.open}</CardTitle>
                            <CardTitle>Closed : {this.state.bugStats.closed}</CardTitle>
                            <CardTitle>High : {this.state.bugStats.severity && this.state.bugStats.severity.high}</CardTitle>
                            <CardTitle>Medium : {this.state.bugStats.severity && this.state.bugStats.severity.medium}</CardTitle>
                            <CardTitle>Low : {this.state.bugStats.severity && this.state.bugStats.severity.low}</CardTitle>
                        </Card>
                        <Footer />
                    </div>
                </div>
            </div>
        )
    }
}
export default BugStats;
