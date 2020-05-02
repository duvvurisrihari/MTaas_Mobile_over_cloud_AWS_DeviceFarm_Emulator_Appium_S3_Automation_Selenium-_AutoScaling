const child_process = require('child_process');


exports.logOut = () => {
    return new Promise(resolve => {
        let cmd = 'gmsaas'
        // let cmddata;
        console.log("Logging Out");
        let cp = child_process.spawn(cmd, ['auth', 'logout'])
        cp.stdout.on('data', (data) => {
            resolve(data.toString())
        })
    })
};

