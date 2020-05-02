import React, { Component } from 'react';

class Home extends Component {

    render() {

        return (
            <div class="w-100">
                <div className="border">
                    <h2 className="text-center">{this.props.heading}</h2>
                </div>
                <div className={`p-5 text-white ${this.props.background}`}>
                    <p className="display-1 font-weight-bold text-center">{this.props.count}</p>
                </div>
            </div>
        )
    }
}
//export Home Component
export default Home;