'use strict'

import Projects from '../../../models/mongoDB/projects'
import Users from '../../../models/mongoDB/users'
import EmulatorRuns from '../../../models/mongoDB/emulatorRuns'
import Runs from '../../../models/mongoDB/runs'
import constants from '../../../utils/constants'
import devicefarm from '../../../utils/deviceFarmUtils'
import findProject from '../../../utils/projectUtils'
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

/**
 * Create user and save data in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.createDevicePool = async (req, res) => {

	try {
		let result = await findProject.findProject(req.body.projectId)
		let params = {
			name: req.body.name,
			description: req.body.description,
			projectArn: result.ARN,
			rules: [{
				"attribute": "ARN",
				"operator": "IN",
				"value": req.body.deviceARNs
			}]
		}
		let createdDevicePool = await devicefarm.createDevicePool(params)
		console.log("createdDevicePool", createdDevicePool)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(createdDevicePool)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get list of device pools available in the project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.listDevicePools = async (req, res) => {

	try {
		console.log("HERE")
		let result = await findProject.findProject(req.query.projectId)
		console.log("result", result)
		let params = {
			arn: result.ARN
		}
		let availableDevicePools = await devicefarm.listDevicePools(params)
		console.log(`availableDevicePools: ${availableDevicePools}`)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(availableDevicePools)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Delete a device pool based on ARN.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.deleteDevicePool = async (req, res) => {

	try {
		let params = {
			arn: req.query.arn
		}
		let deletedPool = await devicefarm.deleteDevicePool(params)
		console.log(`deletedPool: ${deletedPool}`)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(deletedPool)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Schedule Run on a project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.scheduleRun = async (req, res) => {

	try {
		let uploadParams

		uploadParams = {
			projectArn: req.body.projectArn,
			type: req.body.fileType
		}
		let appUploadObj = await devicefarm.createUpload(uploadParams, req.files.file[0])

		uploadParams = {
			projectArn: req.body.projectArn,
			type: req.body.testType
		}
		let testUploadObj = await devicefarm.createUpload(uploadParams, req.files.testFile[0])
		const appUploadARN = appUploadObj.upload.arn
		const testUploadARN = testUploadObj.upload.arn
		let getAppUploadParams = {
			arn: appUploadARN
		}
		let getTestUploadParams = {
			arn: testUploadARN
		}
		let result1 = await devicefarm.getUpload(getAppUploadParams)
		let result2 = await devicefarm.getUpload(getTestUploadParams)
		while (result1.upload.status !== "SUCCEEDED" || result2.upload.status !== "SUCCEEDED") {
			if (result1.upload.status !== "FAILED" || result2.upload.status !== "FAILED") {
				return res
					.status(constants.STATUS_CODE.BAD_REQUEST)
					.send("Upload of files failed")
			}
			console.log(result1.upload.status, result2.upload.status)
			await sleep(3000);
			result1 = await devicefarm.getUpload(getAppUploadParams)
			result2 = await devicefarm.getUpload(getTestUploadParams)
		}

		const params = {
			appArn: appUploadARN,
			devicePoolArn: req.body.devicePoolArn,
			executionConfiguration: {
				jobTimeoutMinutes: req.body.jobTimeoutMinutes
			},
			name: req.body.name,
			projectArn: req.body.projectArn,
			test: {
				testPackageArn: testUploadARN,
				type: req.body.testTypeName
			}
		}
		console.log("Params for scheduling run", params)
		let scheduledRun = await devicefarm.scheduleRun(params)
		console.log(`scheduledRun: ${scheduledRun}`)
		const userObj = await Users.findById(req.body.userId)
		const runParams = {
			userId: req.body.userId,
			userName: userObj.name,
			ARN: scheduledRun.run.arn
		}
		const runObj = new Runs(runParams)
		await runObj.save()
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(scheduledRun)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Schedule Run on a project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.listUploads = async (req, res) => {

	try {
		const params = {
			arn: req.query.projectArn
		}
		let allUploads = await devicefarm.listUploads(params)
		console.log(`allUploads: ${allUploads}`)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(allUploads)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get a run in the project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getRun = async (req, res) => {

	try {
		const params = {
			arn: req.query.runArn
		}
		let runObj = await devicefarm.getRun(params)
		console.log("runObj: ", runObj)

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(runObj)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * List runs present in a project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.listRuns = async (req, res) => {

	try {
		const params = {
			arn: req.query.projectArn
		}
		let allRuns = await devicefarm.listRuns(params),
			refinedListOfRuns = [],
			index
		allRuns = allRuns.runs
		if (req.query.type == "Tester") {
			for (index in allRuns) {
				let userRuns = await Runs.findOne({ ARN: allRuns[index].arn })
				if (userRuns.userId == req.query.userId) {
					refinedListOfRuns.push(allRuns[index])
				}
			}
		} else {
			for (index in allRuns) {
				let userRuns = await Runs.findOne({ ARN: allRuns[index].arn })
				allRuns[index]['userName'] = userRuns.userName
				refinedListOfRuns.push(allRuns[index])
			}
		}
		// refinedListOfRuns = allRuns
		// console.log("allRuns: ", allRuns)
		// console.log("refinedListOfRuns: ", refinedListOfRuns)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(refinedListOfRuns)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Stop a run in the project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.stopRun = async (req, res) => {

	try {
		const params = {
			arn: req.query.arn
		}
		let runObj = await devicefarm.stopRun(params)
		console.log("runObj: ", runObj)

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(runObj)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Delete run in the project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.deleteRun = async (req, res) => {

	try {
		const params = {
			arn: req.query.arn
		}
		let runObj = await devicefarm.deleteRun(params)
		console.log("runObj: ", runObj)

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(runObj)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Schedule Run on a project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.listJobs = async (req, res) => {

	try {
		const params = {
			arn: req.query.runArn
		}
		let runDetails = await devicefarm.getRun(params)
		let allJobs = await devicefarm.listJobs(params)

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send({
				runDetails: runDetails.run,
				allJobs: allJobs
			})

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Schedule Run on a project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.listSuites = async (req, res) => {

	try {
		const params = {
			arn: req.query.jobArn
		}
		let allSuites = await devicefarm.listSuites(params)

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(allSuites)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Schedule Run on a project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.listTests = async (req, res) => {

	try {
		const params = {
			arn: req.query.suiteArn
		}
		let allTests = await devicefarm.listTests(params)

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(allTests)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Schedule Run on a project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.listArtifacts = async (req, res) => {

	try {
		const runParams = {
			arn: req.query.runArn
		}
		let runDetails,
			jobIndex,
			allJobs,
			suiteIndex,
			suiteParams,
			allSuites,
			testIndex,
			testParams,
			allTests,
			artifactParams,
			allArtifacts = []
		runDetails = await devicefarm.getRun(runParams)
		allJobs = await devicefarm.listJobs(runParams)
		for (jobIndex in allJobs.jobs) {
			suiteParams = {
				arn: allJobs.jobs[jobIndex].arn
			}


			allSuites = await devicefarm.listSuites(suiteParams)
			for (suiteIndex in allSuites.suites) {
				testParams = {
					arn: allSuites.suites[suiteIndex].arn
				}



				allTests = await devicefarm.listTests(testParams)
				for (testIndex in allTests.tests) {
					artifactParams = {
						arn: allTests.tests[testIndex].arn,
						type: req.query.type
					}
					let artifacts = await devicefarm.listArtifacts(artifactParams)
					let tempObj = {
						job: allJobs.jobs[jobIndex].name,
						suite: allSuites.suites[suiteIndex].name,
						test: allTests.tests[testIndex].name,
						artifacts: artifacts.artifacts
					}
					allArtifacts.push(tempObj)
				}
			}
		}




		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send({
				runDetails: runDetails.run,
				allArtifacts: allArtifacts
			})

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}


exports.listArtifactsInternal = async (runArn,type) => {

	try {
		const runParams = {
			arn: runArn
		}
		let runDetails,
			jobIndex,
			allJobs,
			suiteIndex,
			suiteParams,
			allSuites,
			testIndex,
			testParams,
			allTests,
			artifactParams,
			allArtifacts = []
		runDetails = await devicefarm.getRun(runParams)
		allJobs = await devicefarm.listJobs(runParams)
		for (jobIndex in allJobs.jobs) {
			suiteParams = {
				arn: allJobs.jobs[jobIndex].arn
			}


			allSuites = await devicefarm.listSuites(suiteParams)
			for (suiteIndex in allSuites.suites) {
				testParams = {
					arn: allSuites.suites[suiteIndex].arn
				}



				allTests = await devicefarm.listTests(testParams)
				for (testIndex in allTests.tests) {
					artifactParams = {
						arn: allTests.tests[testIndex].arn,
						type: type
					}
					let artifacts = await devicefarm.listArtifacts(artifactParams)
					let tempObj = {
						job: allJobs.jobs[jobIndex].name,
						suite: allSuites.suites[suiteIndex].name,
						test: allTests.tests[testIndex].name,
						artifacts: artifacts.artifacts
					}
					allArtifacts.push(tempObj)
				}
			}
		}	
		return {
				runDetails: runDetails.run,
				allArtifacts: allArtifacts
			}

	} catch (error) {
		console.log(error.message)
		return null;
	}
}

/**
 * Schedule Run on a project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getDevicePool = async (req, res) => {

	try {
		const params = {
			arn: req.query.arn
		}
		let devicePool = await devicefarm.getDevicePool(params)

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(devicePool)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Schedule Run on a project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.dashboardDetails = async (req, res) => {

	try {
		let allRuns,
			runParams,
			allJobs,
			totalPassed = 0,
			totalFailed = 0,
			activeRuns = 0,
			completedRuns = 0,
			devicesInActiveRuns = 0,
			run

		const params = {
			arn: req.query.projectArn
		}
		allRuns = await devicefarm.listRuns(params)
		for(run of allRuns.runs) {		
			totalPassed += run.counters.passed
			totalFailed += run.counters.failed
			if (run.status !== "COMPLETED") {
				activeRuns += 1
				runParams = {
					arn: run.arn
				}
				allJobs = await devicefarm.listJobs(runParams)
				devicesInActiveRuns += allJobs.jobs.length
			} else {
				completedRuns += 1
			}		
		}

		let projectDetails = await Projects.findById(req.query.projectId)
		let averageDeviceFarmRunsPerTester = allRuns.runs.length / projectDetails.acceptedTesters.length
		// console.log("Average")
		// console.log(allRuns.runs)
		// console.log(projectDetails.acceptedTesters)
		let allEmulatorRuns = await EmulatorRuns.find({
			projectId: req.query.projectId
		})
		let averageEmulatorRunsPerTester = allEmulatorRuns.length / projectDetails.acceptedTesters.length
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send({
				totalPassed: totalPassed,
				totalFailed: totalFailed,
				activeRuns: activeRuns,
				completedRuns: completedRuns,
				devicesInActiveRuns: devicesInActiveRuns,
				averageDeviceFarmRunsPerTester: averageDeviceFarmRunsPerTester,
				averageEmulatorRunsPerTester: averageEmulatorRunsPerTester,
				acceptedTesters: projectDetails.acceptedTesters.length,
				requestedTesters: projectDetails.requestedTesters.length,
				rejectedTesters: projectDetails.rejectedTesters.length,
			})

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}