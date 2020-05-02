import React, {Component} from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import Navigation from '../common/navigation';
import ViewProject from './ViewProject/viewProject';

class Landing extends Component {


    render(){

        return(
            <div>
    
                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                    
                    <ViewProject projectId={this.props.match.params.projectId}/>
                    
                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;