const child_process = require('child_process');


exports.setCredentails = (email, password) => {
    return new Promise(resolve => {
        let cmd = 'gmsaas'
        // let cmddata;
        console.log("Logging In");
        let cp = child_process.spawn(cmd, ['auth', 'login', `${email}`, `${password}`])
        let cmddata;
        cp.stdout.on('data', (data) => {
            resolve(data.toString())
        })
    })
};

