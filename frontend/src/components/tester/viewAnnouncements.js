import React, {Component} from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import Navigation from '../common/navigation';
import axios from 'axios';
import Constants from '../../utils/constants';

class AnnouncementCard extends Component {
    render() {

        let projectObj = this.props.projectObj,
            index,
            announcement = []

        for (index in projectObj.announcements) {
            announcement.push(
                <div className="row">
                    <div className="col-md-8">
                        <p>{ projectObj.announcements[index].text }</p>
                    </div>
                        <div className="col-md-4">
                            <p>{ projectObj.announcements[index].time }</p>
                        </div>
                </div>
            )
        }

        return (
            <div className="shadow p-3">
                <h2>{ projectObj.name }</h2>
                { announcement }
            </div>
        )
    }
}

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            allAnnouncements : []
        }
    }

    componentDidMount() {
        axios.get(`${Constants.BACKEND_SERVER.URL}/users/announcements/all/${localStorage.getItem('281UserId')}`)
        .then((response) => {
            this.setState({
                allAnnouncements: response.data
            })
        })
    }

    render(){

        var announcementCards = []
        for (var index in this.state.allAnnouncements) {
            var projectObj = this.state.allAnnouncements[index]
            if (projectObj.announcements.length > 0) {
                announcementCards.push(<AnnouncementCard projectObj = { projectObj } />)
            }
        }

        return(
            <div>
    
                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                    
                    {/* Component design goes here */}
                    { announcementCards }
                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;