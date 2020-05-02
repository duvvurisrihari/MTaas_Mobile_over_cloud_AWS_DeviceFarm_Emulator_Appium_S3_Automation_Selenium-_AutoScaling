import mongoose from 'mongoose';
import Users from '../../../models/mongoDB/users';
import Projects from '../../../models/mongoDB/projects';
import constants from '../../../utils/constants';

/**
 * Create user and save data in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.createUser = async (req, res) => {
	let createdUser

	let filter = {}
	try {
		filter.email = req.body.email
		const user = await Users.findOne(filter)
		if (user) {
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_ALREADY_EXISTS)
		}

		let userObj = req.body
		let newUser = new Users(userObj)
		createdUser = await newUser.save()
		createdUser = createdUser.toJSON()
		delete createdUser.password
		return res
			.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS)
			.send(createdUser)
	} catch (error) {
		console.log(`Error while creating user ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Login user and send auth token and user details in response.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.loginUser = async (req, res) => {
	try {
		var user

		var isAuth = false
		user = await Users.findOne({ 
			email: req.body.email,
			isActive: true
		})

		if (user) {
			const validate = await user.validatePassword(req.body.password)
			if (validate) {
				// const token = user.generateToken()
				user = user.toJSON()
				delete user.password
				// user.token = token
				// let tokenObj = {
				// 	token : token,
				// 	date: Date.now()
				// }
				isAuth = true
				return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(user)
			}
		}
		if (!isAuth) {
			return res
				.status(constants.STATUS_CODE.UNAUTHORIZED_ERROR_STATUS)
				.send(constants.MESSAGES.AUTHORIZATION_FAILED)
		}
	} catch (error) {
		console.log(`Error while logging in user ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get user profile details based on userid.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getUserProfile = async (req, res) => {
	try {

		let details = await Users.findById(
			mongoose.Types.ObjectId(req.params.userId)
		)
		if (details) {
			details = details.toJSON()
			delete details.password
			return res.status(200).send(details)
		} else {
			return res.status(204).json()
		}
	} catch (error) {
		console.log(`Error while getting user profile details ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Update user details based on userid.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.updateUserProfile = async (req, res) => {

	try {
		if (req.body.email == undefined) {
			return res
				.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS)
				.send(constants.MESSAGES.USER_VALUES_MISSING)
		}

		const user = await Users.findOne({
			_id: {
				$ne: mongoose.Types.ObjectId(req.body.userId)
			},
			email: req.body.email
		})
		if (user) {
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_DETAILS_ALREADY_EXISTS)
		}

		let userObj = req.body

		// updating password
		if (req.body.password) {
			userObj.password = updatePassword(req.body.password)
		} else {
			delete userObj.password
		}

		let details = await Users.findByIdAndUpdate(
			mongoose.Types.ObjectId(req.body.userId),
			{
				$set: userObj
			},
			null,
			null
		)
		return res.status(200).send(details.toJSON())

	} catch (error) {
		console.log(`Error while getting user profile details ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Returns list of all projects.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.allProjects = async (req, res) => {

	try {

		let allProjects = await Projects.find({})
		// console.log(allProjects)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(allProjects.reverse())
	} catch (error) {
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Returns list of all projects.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.acceptedProjects = async (req, res) => {

	try {
		console.log("HERE")
		let userObj = await Users.findById(req.params.userId),
			index,
			projectId,
			projectObj,
			allProjects = []
		console.log(userObj)
		for (index in userObj.acceptedProjects) {
			projectId = userObj.acceptedProjects[index]
			projectObj = await Projects.findById(projectId)
			console.log(projectObj)
			if (projectObj !== null) {
				allProjects.push(projectObj)
			}
		}

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(allProjects.reverse())
	} catch (error) {
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}


/**
 * Returns list of all projects.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.projectsDetails = async (req, res) => {

	try {

		let userObj = await Users.findById(req.params.userId)
		if (userObj.requestedProjects.includes(req.params.projectId)) {
			return res
				.status(constants.STATUS_CODE.SUCCESS_STATUS)
				.send({
					status: "Requested"
				})
		} else if (userObj.acceptedProjects.includes(req.params.projectId)) {
			return res
				.status(constants.STATUS_CODE.SUCCESS_STATUS)
				.send({
					status: "Accepted"
				})
		} else if (userObj.rejectedProjects.includes(req.params.projectId)) {
			return res
				.status(constants.STATUS_CODE.SUCCESS_STATUS)
				.send({
					status: "Rejected"
				})
		}

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send({
				status: "No"
			})
	} catch (error) {
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}


/**
 * Returns list of all projects.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.joinProject = async (req, res) => {

	try {
		let projectObj = await Projects.findById(req.body.projectId)
		if (projectObj.requestedTesters.includes(req.body.userId)) {
			return res
				.status(constants.STATUS_CODE.NO_CONTENT_STATUS)
				.send("Already a member")
		}
		await Projects.findByIdAndUpdate(
			req.body.projectId,
			{
				$push: {
					requestedTesters: req.body.userId
				}
			}
		)

		await Users.findByIdAndUpdate(
			req.body.userId,
			{
				$push: {
					requestedProjects: req.body.projectId
				}
			}
		)

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send("Success")
	} catch (error) {
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}


/**
 * Returns list of all projects.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.allAnnouncements = async (req, res) => {
	try {
		const userObj = await Users.findById(req.params.userId);
		let index;
		let projectId;
		let projectObj;
		const allProjects = [];

		for (index in userObj.acceptedProjects) {
			projectId = userObj.acceptedProjects[index];
			projectObj = await Projects.findById(projectId);
			allProjects.push(projectObj);
		}

		return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(allProjects);
	} catch (error) {
		return res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error.message);
	}
};