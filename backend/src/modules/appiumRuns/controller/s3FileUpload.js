const AWS = require('aws-sdk');
import config from '../../../../config/index'
const path = require("path");
const fs = require('fs');


AWS.config.update({
    secretAccessKey: config.awsKeysSrihari.AWS_SECRET_ACCESS,
    accessKeyId: config.awsKeysSrihari.AWS_ACCESSKEY,
    region: config.awsKeysSrihari.REGION
})

var s3 = new AWS.S3()


exports.fileUpload = async (req, res) => {
    // let bucketName, folderName, fileObj
    // bucketName = req.body.projectId;
    // folderName = req.body.userId;
    // fileObj = req.file

    // // console.log("PARAMS", bucketName, folderName, fileObj)
    // const date = new Date();
    // const RunName = "RUN" + date.getMonth() + 1 + "" + date.getDate() + "" + date.getFullYear() + "" + date.getHours() + "" + date.getMinutes();
    // const params = {
    //     Bucket: bucketName,  // Param 1 of the function
    //     Key: `${folderName}/emulator/${RunName}/${String(fileObj.originalname)}`, // Folder Name (Param 2) + Type (param 3) + file obj (param 4)
    //     ACL: 'public-read', // File name you want to save as in S3
    //     Body: new Buffer(fileObj.buffer) // Param 4
    // };
    // // console.log("PARAMS FOR UPLOADING", params)

    // return new Promise((resolve, reject) => {
    //     s3.upload(params, function (err, data) {
    //         if (err) {
    //             throw err;
    //         }
    //         console.log(`File uploaded successfully. ${data.Location}`);
    //     })
    //         .promise()
    //         .then(() => {
    //             var createdURL = s3.getSignedUrl('getObject', { Bucket: bucketName, Key: `${folderName}/${String(fileObj.originalname)}` })
    //             console.log(`The URL is ${createdURL}`) // Return value of the function
    //             resolve(createdURL)
    //         })
    // })




    let folderPath = './src/apkStore/';

    fs.readdir(folderPath, (err, files) => {

        if (!files || files.length === 0) {
            console.log(`provided folder '${folderPath}' is empty or does not exist.`);
            console.log('Make sure your project was compiled!');
            return;
        }
        for (const fileName of files) {

            const filePath = path.join(folderPath, fileName);
            if (fs.lstatSync(filePath).isDirectory()) {
                continue;
            }

            fs.readFile(filePath, (err, data) => {
                if (err) throw err;
                const params = {
                    Bucket: req.projectId, // pass your bucket name
                    Key: `${req.userId}/emulator/${req.runId}/${fileName}`,
                    ACL: 'public-read', // File name you want to save as in S3
                    Body: new Buffer(data.buffer) // Param 4
                };

                // console.log(params);
                s3.upload(params, function (err, data) {
                    if (err) {
                        throw err;
                    }
                    console.log(`File uploaded successfully. ${data.Location}`);
                })
                    .promise()
                    .then(() => {
                        var createdURL = s3.getSignedUrl('getObject', { Bucket: req.projectId, Key: `${folderName}/${String(fileObj.originalname)}` })
                        console.log(`The URL is ${createdURL}`) // Return value of the function
                        resolve(createdURL)
                    })
            });

            fs.unlink(filePath, err => {
                if (err) throw err;
            });
        }
    });

}
