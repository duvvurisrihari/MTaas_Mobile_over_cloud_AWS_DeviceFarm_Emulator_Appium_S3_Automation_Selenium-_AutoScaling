const child_process = require('child_process');


exports.createEmulator = (req) => {
    return new Promise(resolve => {
        let cmd = 'gmsaas'
        // let cmddata;
        let recipeId = req.recipeId;
        console.log("starting instance");
        let cp = child_process.spawn(cmd, ['instances', 'start', `${recipeId}`, 'emulatedDevice'])
        cp.stdout.on('data', (data) => {
            setTimeout(() => { console.log("Created Emulator Device"); resolve(data.toString()) }, 1000);

        })
    })
};

