import common from '../../../../config/env/common';
import config from '../../../../config/index';

const wdio = require('webdriverio');
const assert = require('assert');

// const opts = {
//   port: 4723,
//   path:'/wd/hub/',
//   capabilities: {
//     platformName: "Android",
//     platformVersion: "8.1",
//     deviceName: "emulator-5554",
//     app: "./ApiDemos.apk",
//     appPackage: "io.appium.android.apis",
//     appActivity: ".view.TextFields",
//     automationName: "UiAutomator1"
//   }
// };

exports.runAppium = async (req) => {
	const opts = {
		port: 4723,
		path: '/wd/hub/',
		capabilities: {
			platformName: req.platformName,
			platformVersion: req.platformVersion,
			deviceName: req.deviceName,
			app: `./src/apkStore/${req.app}`,
			appPackage: req.appPackage,
			appActivity: req.appActivity,
			automationName: req.automationName,
		},
	};
	//console.log("current path " + process.cwd())
	const client = await wdio.remote(opts);

	const field = await client.$('android.widget.EditText');
	await field.setValue('Hello World!');
	const value = await field.getText();

	assert.equal(value, 'Hello World!');
	const serverLogs = client.getLogs('bugreport');

	await client.deleteSession();
	return serverLogs;
};