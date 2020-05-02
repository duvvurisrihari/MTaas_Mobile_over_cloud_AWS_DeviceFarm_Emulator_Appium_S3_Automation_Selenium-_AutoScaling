import React, { Component } from 'react';
import landingImage from '../../../Assets/Images/LandingImage.jpg'
import Header from '../header'
import Footer from '../footer'
import './LandingPage.styles.css'
import Banner from '../Banner/Banner'

import DeviceIcon from '../../../Assets/Icons/Mobile.svg'
import ScriptIcon from '../../../Assets/Icons/Script.svg'
import ResultIcon from '../../../Assets/Icons/Result.svg'

import MoneyIcon from '../../../Assets/Icons/MoneyMobile.svg'
import CloudIcon from '../../../Assets/Icons/Cloud.svg'
import ScaleIcon from '../../../Assets/Icons/Scaling.svg'
import { Redirect } from 'react-router'




class LandingPage extends Component {
    state = {}
    render() {
        const banner1 = [
            {
                imageURL: DeviceIcon,
                text: 'Select a device pool of your choice from out list of available devices'
            },
            {
                imageURL: ScriptIcon,
                text: 'Upload a custom testing script and your application file'
            },
            {
                imageURL: ResultIcon,
                text: 'Get back your test results supported with a bug finder'
            }
        ]

        const banner2 = [
            {
                imageURL: MoneyIcon,
                text: 'Lower Infrastructure setup costs, and hence more savings'
            },
            {
                imageURL: CloudIcon,
                text: 'Cloud support ensures that you can work from anywhere'
            },
            {
                imageURL: ScaleIcon,
                text: 'Scalability kicks in when you want to extend your testing capabilities'
            }
        ]
        if (localStorage.getItem('281UserId')) {
            return (
                <Redirect to="/tester/dashboard" />
            )
        }
        return (
            <div>
                <Header />


                <div className='landingPage' style={{ background: '#f8f9fb' }} >
                    <div >
                        <img src={landingImage} style={{ width: '100%' }} alt="landing-page" />

                    </div>
                    <div style={{ color: '#000', position: 'absolute', top: '20%', left: '50%' }}>
                        <p className='display-2' >MTaaS</p>
                        <p className='display-4'>Mobile Testing as a Service</p>
                    </div>
                    <div className='landingContent'>
                        <div className='landingText'>
                            <p >An application testing service that lets you improve the quality of your web and mobile apps by testing them across an range of mobile devices. How? </p>
                        </div>

                        <Banner bannerDetails={banner1} />

                        <div className='landingText'>
                            <p >Why?</p>
                        </div>
                        <Banner bannerDetails={banner2} />

                    </div>
                </div>


                <Footer />
            </div>
        );
    }
}

export default LandingPage;