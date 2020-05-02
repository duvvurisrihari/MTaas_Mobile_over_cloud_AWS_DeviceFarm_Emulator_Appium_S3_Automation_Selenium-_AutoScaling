const child_process = require('child_process');

let portCounter = 5556;
exports.linkADB = (UUID, port) => {
    return new Promise((resolve, reject) => {
        let cmd = 'gmsaas'
        console.log("linking to ADB " + UUID + "------" + port);
        let cp = child_process.spawnSync(cmd, ['instances', 'adbconnect', `${UUID}`, '--adb-serial-port', `${port}`])
        // cp = child_process.spawn('adb', ['devices'])
        // portCounter = portCounter + 2;
        // cp.stdout.on('data', (data) => {
        //     console.log(data.toString())
        // })
        // cp.stderr.on('data', (data) => {
        //     reject(data)
        // })
        // console.log("Added device")
        // setTimeout(() => {
        //     resolve()
        // }, 5000)
        resolve();

    })
};

// this.linkADB();

