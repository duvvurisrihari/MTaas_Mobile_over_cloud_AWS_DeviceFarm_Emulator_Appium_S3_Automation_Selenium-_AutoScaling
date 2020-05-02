import React, { Component } from "react";
import Header from "../../common/header";
import Footer from "../../common/footer";
import Navigation from "../../common/navigation";
import axios from "axios";
import Constants from "../../../utils/constants";

import "./CreateTest.styles.css";


class CreateTest extends Component {
	state = {
		platformName: "",
		platformVersion: "",
		deviceName: "",
		app: "",
		appPackage: "",
		appActivity: "",
		automationName: "",
		selectedFile: null,
		projectId: "",
	};

	handleChange = e => {
		console.log(this.state);
		const { value, name } = e.target;
		this.setState({ [name]: value });
	};

	onFileChange = event => {
		//  event.preventDefault();

		// Update the state
		this.setState({ selectedFile: event.target.files[0] });
		if (this.state.selectedFile) {
			this.setState({ app: this.state.selectedFile.name });
		}
	};

	onFileUpload = e => {
		e.preventDefault();
		//  this.setState({ projectId: this.props.match.params.projectId })
		let formData = new FormData();
		formData.append("file", this.state.selectedFile);
		formData.append('projectId', this.props.projectId)
		formData.append('userId', localStorage.getItem('281UserId'))

		axios
			.post(
				`${Constants.BACKEND_SERVER.URL}/emulators/fileUpload`,
				formData
			)
			.then(response => {
				if (response.status === 201) {
					window.alert("File Uploaded Successfully");
				} else {
					console.log(response);
				}
			});
	};
	onSubmit = e => {
		e.preventDefault();

		const capabilities = {
			platformName: this.state.platformName,
			platformVersion: this.state.platformVersion,
			deviceName: this.state.deviceName,
			app: this.state.selectedFile.name,
			appPackage: this.state.appPackage,
			appActivity: this.state.appActivity,
			automationName: this.state.automationName
		};
		const reqobj = {
			capabilities: capabilities,
			projectId: this.props.projectId,
			userId: localStorage.getItem('281UserId'),
			userName: localStorage.getItem('281Username'),

		}
		console.log(capabilities);
		axios
			.post(
				`${Constants.BACKEND_SERVER.URL}/emulators/createtest`,
				reqobj
			)
			.then(response => {
				console.log(response);
				localStorage.setItem('emulatorRunID', response.data)
				this.props.history.push(`/tester/project/run/viewTestRun/${reqobj.projectId}`)
			});
	};

	// File content to be displayed after
	// file upload is complete
	fileData = () => {
		if (this.state.selectedFile) {
			return (
				<div>
					<p>File Details:</p>
					<p>File Name: {this.state.selectedFile.name}</p>
					<p>File Type: {this.state.selectedFile.type}</p>
					<p>
						Last Modified:{" "}
						{this.state.selectedFile.lastModifiedDate.toDateString()}
					</p>
				</div>
			);
		} else {
			return (
				<div>
					<br />
					<p>Choose before Pressing the Upload button</p>
				</div>
			);
		}
	};


	render() {
		const platformVersionSelect = () => {
			if (this.state.platformName === 'Android') {
				return (
					<select name="platformVersion"
						value={this.state.platformVersion}
						onChange={this.handleChange}
						className='form-control'
					>
						<option value=''>Select Version</option>

						<option value='8.1'>Oreo 8.1</option>
					</select>
				)
			}
			else if (this.state.platformName === 'iOS') {
				return (
					<select name="platformVersion"
						value={this.state.platformVersion}
						onChange={this.handleChange}
						className='form-control'
					>
						<option value=''>Select Version</option>

						<option value='13'>iOS 13</option>
					</select>
				)
			}
			else {
				return (
					<select name="platformVersion"
						value={this.state.platformVersion}
						onChange={this.handleChange}
						className='form-control'
					>
						<option >Select Platform Name first</option>
					</select>
				)
			}
		}

		const deviceSelect = () => {
			if (this.state.platformVersion === '8.1') {
				return (
					<select name="deviceName"
						value={this.state.deviceName}
						onChange={this.handleChange}
						className='form-control'
					>
						<option value=''>Select Device</option>

						<option value='emulator-5554'>Pixel 3a</option>
						<option value='emulator-5556'>Pixel XL</option>

					</select>
				)
			}
			else if (this.state.platformName === 'iOS') {
				return (
					<select name="platformVersion"
						value={this.state.platformVersion}
						onChange={this.handleChange}
						className='form-control'
					>
						<option value=''>Select Version</option>

						<option value='iPhoneXS'>iPhone XS</option>
						<option value='iPhone6'>iPhone 6</option>

					</select>
				)
			}
			else {
				return (
					<select name="platformVersion"
						value={this.state.platformVersion}
						onChange={this.handleChange}>
						<option >Select Platform Version first</option>
					</select>
				)
			}
		}



		return (
			<div>
				{/* <!-- Card with information --> */}
				< div className=" bg-white pl-5 pr-5 pb-5" >

					<div className='createTest '>
						<div>
							<form className="emulatorForm">
								Platform Name:{" "}
								<select name="platformName"
									className='form-control'

									value={this.state.platformName}
									onChange={this.handleChange}>
									<option value=''>Select Platform Name</option>
									<option value='Android' >Android</option>
									<option
										value="iOS"
									>iOS</option>

								</select>

              Platform Version:{" "}
								{platformVersionSelect()}
              Device Name:{" "}
								{deviceSelect()}
								{
									//upload test apk file here
								}
              App:
              <input type="file" onChange={this.onFileChange} />
								{this.fileData()}
								<button onClick={this.onFileUpload}>Upload!</button>
              App Package:{" "}
								<input
									type="text"
									name="appPackage"
									value={this.state.appPackage}
									onChange={this.handleChange}
									className='form-control'

								></input>
              App Activity:{" "}
								<input
									type="text"
									name="appActivity"
									value={this.state.appActivity}
									onChange={this.handleChange}
									className='form-control'
								></input>
              Automation Name:{" "}
								<input
									type="text"
									name="automationName"
									value={this.state.automationName}
									onChange={this.handleChange}
									className='form-control'

								></input>
								<button onClick={this.onSubmit}>Create Test</button>
							</form>
						</div>
					</div>

				</div >
			</div >
		);
	}
}
export default CreateTest;
