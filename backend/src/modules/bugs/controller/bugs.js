'use strict'

import mongoose from 'mongoose';
import Bugs from '../../../models/mongoDB/bugs'
import Users from '../../../models/mongoDB/users';
import Projects from '../../../models/mongoDB/projects';
import constants from '../../../utils/constants';
import deviceFarmController from '../../deviceFarm/controller/deviceFarm';

const fetch = require("node-fetch");

exports.createBug = async (req, res) => {
	try {
        var bugObject = {
            name: req.body.name,
            subject : req.body.subject,
            projectId : req.body.projectId,
            status : req.body.status,
            severity : req.body.severity,
            tester : req.body.tester
		}
		console.log(bugObject)
        var newBug = new Bugs(bugObject);
        var createdBug = await newBug.save();
        return res
                .status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS)
                .send(createdBug);
	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

let getUserProfile = async  (userId) => {
	try {
		let details = await Users.findById(
			mongoose.Types.ObjectId(userId)
		)
		return details;
	} catch (error) {
		console.log("error",error.message);
	}
}

let projectsByManager = async (userId) => {
	try {
		let projectIdList = []
		let promises = [] 
		let projectDetails = await Projects.find({managerId : userId})
		projectDetails.forEach(async project => {
			console.log(project);
			// projectIdList.push(project._id)
			promises.push(await projectIdList.push(project._id));
		})
		return Promise.all(promises)
        .then( result => {
			console.log("here 1",projectIdList)
            return projectIdList;
        })
	} catch (error) {
		console.log("error",error.message);
	}
}

let getBugs = async (projects) => {
	console.log(projects)
	try {
		let bugs = await Bugs.find({
			projectId : {
				$in : projects
			}
		})
		return bugs;
	} catch (error) {
		console.log(error.message)
	}
}

exports.getAllBugs = async (req, res) => {
	try {
		let userId = req.params.userId;
		let user = await getUserProfile(userId)
		if(user.type=="Manager"){
			console.log(user)
			let projects = await projectsByManager(userId)
			let bugs = await getBugs(projects);
			return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(bugs)
		}
		else {
			let bugs = await getBugs(user.acceptedProjects);
			return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(bugs)
		}
	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

exports.getBug = async (req, res) => {

	try {
		let filter = {
			_id: req.params.bugId
		}
		let bug = await Bugs.find(filter)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(bug[0])
	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

exports.updateBug = async (req, res) => {
	try {
		await Bugs.findByIdAndUpdate(
            { _id : req.params.bugId},
			{
                    name: req.body.name,
                    subject : req.body.subject,
                    severity : req.body.severity,
                    status : req.body.status,
                    tester : req.body.tester
			},
			function(err, result) {
				if (err) {
				  res.send(err);
				} else {
				  res.status(200).send(result)
				}
			  }
		)
	} catch (error) {
		console.log(`Error while updating bug: ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

exports.getBugsInProject = async (req, res) => {

	try {
		let filter = {
			projectId: req.params.projectId
		}
		let bugs = await Bugs.find(filter)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(bugs)
	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

exports.deleteBug = async (req,res) => {
	try{
		Bugs.deleteOne({ _id: req.body.bugId }, 
			function(err, result) {
				if (err) {
				res.send(err);
				} else {
				res.status(200).send()
				}
			  }
		)
	}
	catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

exports.getBugStatsByProject = async (req,res) => {
	try {
		let filter = {
			projectId: req.params.projectId
		}
		let result = {
			total : 0,
			open : 0,
			closed : 0,
			severity : {
				high : 0,
				medium : 0,
				low : 0
			}
		}
		let bugs = await Bugs.find(filter)
		bugs.forEach(bug => {
			result.total = result.total+1;
			if(bug.status=="Closed")
				result.closed = result.closed+1;
			else 
				result.open = result.open+1;
			if(bug.severity=="High")
				result.severity.high = result.severity.high+1;
			else if(bug.severity=="Medium")
				result.severity.medium = result.severity.medium+1;
			else
				result.severity.low = result.severity.low+1;
		})
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(result)
	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

exports.getErrorReports = async (req,res) => {
	try{
		let listArtifacts = await deviceFarmController.listArtifactsInternal(req.query.runArn,req.query.type);
		let resultObject = {}
		let artifactsObject = []
		let promises = [] 
		let runDetails = listArtifacts["runDetails"];
		resultObject["arn"] = runDetails["arn"];
		let allArtifacts = listArtifacts["allArtifacts"];

		allArtifacts.forEach(item => {

			let errorObjects = [];
			let artifactObject = {};
			let artifacts = item.artifacts
			artifactObject["job"] = item.job;

			artifacts.forEach( element =>{
				promises.push( getUrlContent(element.url,errorObjects));
			})

			artifactObject["errors"] = errorObjects;
			artifactsObject.push(artifactObject);
		});
		Promise.all(promises)
		.then( result => {
			return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(artifactsObject)
		})
	}
	catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

let getUrlContent =  (artifactURL,errorObjects) =>{
	return new Promise(function (resolve, reject) {
	fetch(artifactURL, {
		mode: 'no-cors',
		headers: {
		  'Access-Control-Allow-Origin':'*'
		}
	})
	.then( response => {
		return response.json();
	})
	.then( response => {
		response.map(element => {
			if(element.level==="Error"){
				errorObjects.push({
					"pid" : element.pid,
					"data" : element.data
				})
			}
		})
		resolve(errorObjects);
	})
	.catch(error => {
		console.log("error",error.message);
		reject();
	})
})
}

