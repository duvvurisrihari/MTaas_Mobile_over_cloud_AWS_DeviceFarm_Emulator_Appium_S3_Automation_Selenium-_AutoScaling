const login = require('./SetCredentials')
const createEmulator = require('./CreateEmulator')
const linkADB = require('./LinkADB')
const stopEmulator = require('./StopEmulator')
const runAppium = require('../RunTest')
const logout = require('./LogOut')



exports.RunGenyMotion = async (req) => {

    //await login.setCredentails('duvvurisrihari@gmail.com', 'password123');
    let x = await createEmulator.createEmulator(req);
    console.log(x);
    let y = await linkADB.linkADB(x.trim(), req.port)

    console.log("Added device");
    console.log("Run Test on Appium")
    let run = await runAppium.runAppium(req)

    // console.log(run);
    let z = await stopEmulator.stopEmulator(x.trim());
    // await logout.logOut();
    console.log("Run Complete");

}

