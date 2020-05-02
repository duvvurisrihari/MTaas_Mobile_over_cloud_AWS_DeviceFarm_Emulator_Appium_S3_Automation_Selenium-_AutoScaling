import React, { Component } from 'react';
import Header from "../../common/header";
import Footer from "../../common/footer";
import Navigation from "../../common/navigation";
import { Link } from 'react-router-dom'
class RunConfirmation extends Component {
	state = {}
	render() {
		return (
			<div>
				<Header />
				<Navigation />
				<div>
					<div className="row pt-5 mb-5">
						<div className="col-md-4 offset-md-4 p-5 shadow">
							<h5 className="text-center font-weight-bolder">Run Completed</h5>
							<div className="mt-3">
								<div className="form-group">
									<label>Please make of note of the Run ID:</label>
								</div>
								<div className="form-group">
									<label >{localStorage.getItem('emulatorRunID')}</label>
								</div>

								<button type="button" class="btn btn-light"><Link style={{ textDecoration: 'none' }} to='/tester/project/accepted'>Back to all Projects</Link></button>
							</div>
						</div>
					</div>

				</div>
				<Footer />
			</div>
		);
	}
}

export default RunConfirmation;