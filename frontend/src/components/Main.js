import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./root/login";
import Logout from "./root/logout";
import CreateAccount from "./root/createAccount";

import AdminCheck from "./admin/adminCheck";
import AdminCreateAccount from "./admin/createAccount";
import AdminLogin from "./admin/login";
import AdminDashboard from "./admin/dashboard";
import AdminViewManagers from "./admin/viewManagers";
import AdminViewProjects from "./admin/viewProjects";
import AdminViewTesters from "./admin/viewTesters";

import TesterHome from "./tester/dashboard";
import TesterCheck from "./tester/testerCheck";
import TesterUpdateAccount from "./tester/updateAccount";
import TesterViewAllProjects from "./tester/viewAllProjects";
import TesterViewAcceptedProjects from "./tester/viewMyProjects";
import TesterViewProjectDetails from "./tester/projectDetails";
import TesterAnnouncements from "./tester/viewAnnouncements";
import TesterRunTest from "./tester/ViewProject/RunTest/runTest";
import TesterViewRuns from "./tester/ViewProject/ViewRuns/viewRuns";
import TesterViewRunDetails from "./tester/ViewProject/RunDetails/viewJobs";
import TesterViewRunArtifacts from "./tester/ViewProject/RunArtifacts/viewArtifacts";

import ManagerHome from "./manager/dashboard";
import ManagerCheck from "./manager/managerCheck";
import ManagerUpdateAccount from "./manager/updateAccount";
import ManagerViewMyProjects from "./manager/myProjects";
import MangerCreateProject from "./manager/createProject";
import ManagerViewProjectDetails from "./manager/projectDetails";
import ManagerViewProjectRuns from "./manager/ViewProject/ProjectDetails/viewRuns";
import ManagerViewEmulatorRuns from "./manager/ViewProject/EmulatorRuns/emulatorRuns";
import ManagerViewProjectDevices from "./manager/AddDevices/projectDevices"
import ManagerBilling from "./manager/Billing/billing";
import ManagerViewBill from "./manager/Billing/generateBill";
import ManagerViewProjectBill from "./manager/ViewProject/billing";
import ViewBugsDashboard from './bugs/bugsDashboard';
import ViewBug from './bugs/viewBug';
import EditBug from './bugs/editBug';
import CreateBug from './bugs/createBug';
import BugsInProjectDashboard from './bugs/bugsInProject';
import ManagerViewRunDetails from "./manager/ViewProject/RunDetails/listJobs";
import ManagerViewRunArtifacts from "./manager/ViewProject/RunArtifacts/viewArtifacts";
import ManagerViewDetailedBill from "./manager/Billing/DetailedBill";

import CreateTest from "../components/emulator/CreateTest/CreateTest";
import ViewEmulatorRuns from '../components/emulator/ViewTests/viewRuns'
import LandingPage from "./common/LandingPage/LandingPage";
import Emulators from "./emulator/Emulators";
import RunConfirmation from "./emulator/RunConfirmation/RunConfirmation";
import BarGraph from '../components/common/BarGraph/BarGraph'

//Create a Main Component
class Main extends Component {
	render() {
		return (
			<div>
				{/*Render Different Component based on Route*/}
				{/* <Route path="/" component={Root} /> */}
				<Route exact path="/" component={LandingPage} />
				<Route path="/login" component={Login} />
				<Route path="/logout" component={Logout} />
				<Route path="/create-account" component={CreateAccount} />

				<Route path="/admin/" component={AdminCheck} />
				<Route path="/admin/create-account" component={AdminCreateAccount} />
				<Route path="/admin/login" component={AdminLogin} />
				<Route path="/admin/dashboard" component={AdminDashboard} />
				<Route path="/admin/managers" component={AdminViewManagers} />
				<Route path="/admin/projects" component={AdminViewProjects} />
				<Route path="/admin/testers" component={AdminViewTesters} />

				<Route path="/tester/" component={TesterCheck} />
				<Route path="/tester/dashboard" component={TesterHome} />
				<Route path="/tester/update-account" component={TesterUpdateAccount} />

				<Route path="/tester/project/all" component={TesterViewAllProjects} />
				<Route path="/tester/project/accepted" component={TesterViewAcceptedProjects} />
				<Route path="/tester/project/view/:projectId" component={TesterViewProjectDetails} />
				<Route path="/tester/project/run/schedule/:projectId" component={TesterRunTest} />
				<Route path="/tester/project/run/view/:projectId" component={TesterViewRuns} />
				<Route path="/tester/project/run/details/:projectId" component={TesterViewRunDetails} />
				<Route path="/tester/project/run/artifacts/:projectId" component={TesterViewRunArtifacts} />

				<Route path="/tester/project/run/emulator/:projectId" component={Emulators} />
				<Route path="/tester/project/run/viewTestRun" component={RunConfirmation} />
				<Route path="/tester/project/run/viewemulator/:projectId" component={ViewEmulatorRuns} />


				<Route path="/tester/announcements" component={TesterAnnouncements} />

				<Route exact path="/tester/bugs/all" component={ViewBugsDashboard} />
				<Route path="/tester/bugs/viewBug/:bugId" component={ViewBug} />
				<Route path="/tester/bugs/editBug/:bugId" component={EditBug} />
				<Route path="/tester/bugs/createBug/:projectId" component={CreateBug} />
				<Route path="/tester/bugs/project/:projectId" component={BugsInProjectDashboard} />


				<Route path="/manager/" component={ManagerCheck} />
				<Route path="/manager/billing" component={ManagerBilling} />
				<Route path="/manager/dashboard" component={ManagerHome} />
				<Route path="/manager/update-account" component={ManagerUpdateAccount} />
				<Route path="/manager/project/all" component={ManagerViewMyProjects} />
				<Route path="/manager/project/new" component={MangerCreateProject} />
				<Route path="/manager/project/view/:projectId" component={ManagerViewProjectDetails} />
				<Route path="/manager/project/runs/devicefarm/:projectId" component={ManagerViewProjectRuns} />
				<Route path="/manager/project/runs/emulators/:projectId" component={ManagerViewEmulatorRuns} />
				<Route path="/manager/project/run/details/:projectId" component={ManagerViewRunDetails} />
				<Route path="/manager/project/run/artifacts/:projectId" component={ManagerViewRunArtifacts} />
				<Route path="/manager/project/devices/:projectId" component={ManagerViewProjectDevices} />
				<Route path="/manager/view/bill" component={ManagerViewBill} />
				<Route path="/manager/view/detailedbill" component={ManagerViewDetailedBill} />

				<Route path="/manager/project/costs/:projectId" component={ManagerViewProjectBill} />

				<Route exact path="/manager/bugs/all" component={ViewBugsDashboard} />
				<Route path="/manager/bugs/viewBug/:bugId" component={ViewBug} />
				<Route path="/manager/bugs/editBug/:bugId" component={EditBug} />
				<Route path="/manager/bugs/createBug/:projectId" component={CreateBug} />
				<Route path="/manager/bugs/project/:projectId" component={BugsInProjectDashboard} />

				<Route path="/tester/createTest/emulator" component={CreateTest} />

				<Route path="/manager/bargraph" component={BarGraph} />




			</div>
		);
	}
}
//Export The Main Component
export default Main;
