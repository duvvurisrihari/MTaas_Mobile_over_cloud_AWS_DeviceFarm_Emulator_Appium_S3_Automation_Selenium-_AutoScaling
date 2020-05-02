import React from "react";
import "./BannerCard-styles.css";

const BannerCard = (props) => {
	console.log(props.props);
	return (

		<div className="cardText">
			<div>Run ID:{props.props._id}</div>
			<div>Platform Name: {props.props.platfromName}</div>
			<div>Platform Version: {props.props.platformVersion}</div>
			<div>Device Name: {props.props.deviceName}</div>
			<div>App: {props.props.app}</div>
			<div>AppPackage: {props.props.appPackage}</div>
			<div>AppActivity: {props.props.appActivity}</div>
			<div>Automation Name: {props.props.automationName}</div>
			<div>Run Time: {props.props.runTime}</div>
		</div>

	);
};

export default BannerCard;
