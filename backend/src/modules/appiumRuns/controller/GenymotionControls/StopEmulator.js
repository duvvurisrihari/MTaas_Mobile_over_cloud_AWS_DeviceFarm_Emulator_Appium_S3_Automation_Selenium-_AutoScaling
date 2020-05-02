const child_process = require('child_process');

exports.stopEmulator = (UUID) => {
    return new Promise(resolve => {
        let cmd = 'gmsaas'
        // let cmddata;
        console.log("Stopping ADB");
        let cp = child_process.spawn(cmd, ['instances', 'stop', `${UUID}`])
        cp.stderr.on('data', (data) => {
            console.log(data.toString());
        })
        // setTimeout(() => { resolve(data.toString()) }, 1000);
        resolve();
    })
};

