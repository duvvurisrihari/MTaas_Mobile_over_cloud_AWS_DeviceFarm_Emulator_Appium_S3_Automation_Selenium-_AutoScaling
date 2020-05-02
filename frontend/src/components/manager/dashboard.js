import React, { Component } from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import Navigation from '../common/navigation';
import jumboImage from '../../Assets/Images/Jumbotron.jpg'

class Landing extends Component {

    render() {

        return (
            <div>

                {/* <!-- Card with information --> */}
                <div class="bg-white ">
                    <Header />
                    <Navigation />
                    <div >
                        <div >
                            <img src={jumboImage} style={{ width: '100%' }} alt="manager-dashboard" />

                        </div>
                        <div>
                            <p className='display-2' style={{ color: '#000', position: 'absolute', top: '120%', left: '50%' }}>Welcome {localStorage.getItem('281Username')}</p>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;