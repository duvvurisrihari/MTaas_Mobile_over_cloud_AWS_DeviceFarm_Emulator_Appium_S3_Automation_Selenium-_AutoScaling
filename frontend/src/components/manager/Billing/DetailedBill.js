import React, { Component } from 'react';
import Header from '../../common/header';
import Footer from '../../common/footer';
import Navigation from '../../common/navigation';
import ViewBillTable from './viewBillTable'
import { Container } from 'reactstrap';

// import GenerateBill from './generateBill';

class DetailedBill extends Component {

    render() {

        return (
            <div>

                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                    <div class="card-arrange">
                        <Container>

                        </Container>
                    </div>


                    {/* https://reactjs.org/docs/dom-elements.html#style */}
                    <ViewBillTable />
                    <div className="row p-5">
                        <div className="col-md-3 offset-md-8">
                            <a href="/manager/view/bill" target="_blank">
                                <button className="btn btn-warning">View my bill in printer friendly page</button>
                            </a>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default DetailedBill;