`use strict`

module.exports = {
	session: process.env.SESSION,
	token: process.env.TOKEN,
	database: {
		mongoDbUrl: process.env.MONGODB_URL,
		name: process.env.DATABASE,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST,
		port: process.env.DB_DBPORT,
		dialect: process.env.DB_DIALECT,
	},
	sql: {
		host: process.env.RDS_HOST,
		user: process.env.RDS_USER,
		password: process.env.RDS_PASSWORD,
		database: process.env.RDS_DATABASE,
		port: process.env.RDS_PORT
	},
	awsKeysJayasurya: {
		AWS_SECRET_ACCESS: process.env.AWS_SECRET_ACCESS,
		AWS_ACCESSKEY: process.env.AWS_ACCESSKEY,
		REGION: process.env.REGION
	},
	appiumport: process.env.APPIUM_PORT,	
	awsKeysSrihari: {
		AWS_ACCESSKEY: process.env.ACCESS_KEY_SRIHARI,
		AWS_SECRET_ACCESS: process.env.SECRET_KEY_SRIHARI,
		REGION: process.env.REGION_SRIHARI
	},
	frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000", // For now no use of frontend urls in backend, when security is tighetened, add expected urls to cors.
}
