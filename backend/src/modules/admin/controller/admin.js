
import Users from '../../../models/mongoDB/users';
import Projects from '../../../models/mongoDB/projects'
import constants from '../../../utils/constants';

/**
 * Create user and save data in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.createAdmin = async (req, res) => {
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
        userObj.type = "Admin"
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
exports.loginAdmin = async (req, res) => {
	try {
		var user

		var isAuth = false
		user = await Users.findOne({ email: req.body.email })

		if (user) {
			const validate = await user.validatePassword(req.body.password)
			if (validate) {
				user = user.toJSON()
				delete user.password
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
 * Get all projects in the system.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getAllProjects = async (req, res) => {
	try {
        let allProjects = await Projects.find({})
        return res
            .status(constants.STATUS_CODE.SUCCESS_STATUS)
            .send(allProjects)
	} catch (error) {
		console.log(`Error while logging in user ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get all projects in the system.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getAllManagers = async (req, res) => {
	try {

        let allManagers = await Users.find({
            type: 'Manager'
        })
        var managerData = [],
            managerObj
        for (var index in allManagers) {
            managerObj = allManagers[index].toJSON()
            let allProjects = await Projects.find({
                managerId: managerObj._id
            })
            delete managerObj.password
            delete managerObj.type
            delete managerObj.isActive
            managerObj.projectCount = allProjects.length
            managerData.push(managerObj)
        }
        return res
            .status(constants.STATUS_CODE.SUCCESS_STATUS)
            .send(managerData)
	} catch (error) {
		console.log(`Error while logging in user ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get all projects in the system.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getAllTesters = async (req, res) => {
	try {

        let allTesters = await Users.find({
			type: 'Tester'
        })
        
        return res
            .status(constants.STATUS_CODE.SUCCESS_STATUS)
            .send(allTesters)
	} catch (error) {
		console.log(`Error while logging in user ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get all projects in the system.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.blockTester = async (req, res) => {
	try {

        await Users.findByIdAndUpdate(
			req.body.userId,
			{
            	isActive: false
			}
		)
        
        return res
            .status(constants.STATUS_CODE.SUCCESS_STATUS)
            .send("SUCCESS")
	} catch (error) {
		console.log(`Error while logging in user ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}