import emulatorRuns from '../../../models/mongoDB/emulatorRuns'
import constants from '../../../utils/constants';

/**
 * Returns list of all projects created by the manager.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */

exports.getRuns = async (req, res) => {

	try {
		//  console.log(JSON.stringify(req.body))
		let runDetails = await emulatorRuns.find({ projectId: req.body.projectId })

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(runDetails)

	} catch (error) {
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

exports.getRunTime = async (req) => {

	try {
		console.log("Req body--- " + JSON.stringify(req))
		let runtime = 0
		// emulatorRuns.aggregate({
		//     $group: {
		//         projectId: req,

		//         totalRunTime: { $add: "$emulatorRuns_runTime" },
		//     }
		// }, (err, res) => {
		//     console.log("Result: " + JSON.stringify(res));
		//     console.log("error " + JSON.stringify(err))
		// });
		let index
		let rundocs = await emulatorRuns.find({ projectId: req }, (err, res) => {
			//console.log(JSON.stringify(res) + " " + JSON.stringify(err))
			for (index in res) {
				if (res[index].runTime !== undefined) {
					//console.log(parseInt(res[index].runTime))
					runtime += parseInt(res[index].runTime);
				}
			}
			//console.log(runtime);
			//return runtime;
		})
		//runtime = 0
		// console.log("---------------------");

		// console.log(`Response ${JSON.stringify(rundocs)}`);

		// for (erun in runs) {
		//     console.log("Run --- " + JSON.stringify(erun))

		//     // runtime += erun.runTime;
		// }
		// console.log(JSON.stringify(runtime));

		// return runTime

		return runtime
		// .status(constants.STATUS_CODE.SUCCESS_STATUS)
		// .send(runtime)

	} catch (error) {
		return 0
	}
}

