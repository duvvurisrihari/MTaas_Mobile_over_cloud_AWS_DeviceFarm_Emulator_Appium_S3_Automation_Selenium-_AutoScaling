const AWS = require('aws-sdk');
import fs from 'fs';
import config from '../../config/index';

AWS.config.update({
    secretAccessKey: config.awsKeysSrihari.AWS_SECRET_ACCESS,
    accessKeyId: config.awsKeysSrihari.AWS_ACCESSKEY,
    region: config.awsKeysSrihari.REGION
})

var s3 = new AWS.S3()

var createBucket = (bucketName) => {
    const params = {
        Bucket: bucketName,
        ACL: 'public-read',
        CreateBucketConfiguration: {
            // Set your region here
            LocationConstraint: config.awsKeysSrihari.REGION
        }
    };
    console.log("CREATING A BUCKET", params)
    return new Promise((resolve, reject) => {
        s3.createBucket(params, function (err, data) {
            if (err) {
                console.log("BUCKET ALREADY OWNED BY YOU");
            }
            else {
                console.log('Bucket Created Successfully', data.Location);
            }
            resolve();
        })
    });
}

exports.fileupload = async (bucketName, folderName, fileObj) => {
    console.log("PARAMS", bucketName, folderName, fileObj)
    await createBucket(bucketName);
    const params = {
        Bucket: bucketName,  // Param 1 of the function
        Key: `${folderName}/${String(fileObj.originalname)}`, // Folder Name (Param 2) + Type (param 3) + file obj (param 4)
        ACL: 'public-read', // File name you want to save as in S3
        Body: new Buffer(fileObj.buffer) // Param 4
    };
    console.log("PARAMS FOR UPLOADEING", params)

    return new Promise((resolve, reject) => {
        s3.upload(params, function (err, data) {
            if (err) {
                throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`);
        })
            .promise()
            .then(() => {
                var createdURL = s3.getSignedUrl('getObject', { Bucket: bucketName, Key: `${folderName}/${String(fileObj.originalname)}` })
                console.log(`The URL is ${createdURL}`) // Return value of the function
                resolve(createdURL)
            })
    })

}


exports.getAllURLs = (projectId, userIDs) => {

    var params = { Bucket: projectId };

    return new Promise((resolve, reject) => {
        s3.listObjects(params, function (err, data) {
            if (err) {
                resolve("NO SUCK BUCKET")
            } else {
                let sendingback = data.Contents;
                let responseData = [],
                    index,
                    url,
                    key,
                    bucket,
                    folder

                for (index in sendingback) {
                    // Get the url for this
                    bucket = projectId
                    key = sendingback[index].Key
                    folder = key.split("/")[0]
                    if (userIDs.includes(folder)) {
                        url = s3.getSignedUrl('getObject', { Bucket: bucket, Key: key })
                        responseData.push({
                            name: sendingback[index].Key,
                            url: url
                        })
                    }
                }
                resolve(responseData);
            }
        });

    })
}

exports.deleteFile = async (bucketName, filename) => {

    var params = {
        Bucket: bucketName,
        Delete: { // required
            Objects: [ // required
                {
                    Key: filename
                }
            ],
        },
    };
    console.log(params)
    return new Promise((resolve, reject) => {
        s3.deleteObjects(params, function (err, data) {
            if (err) {
                resolve("BUCKER DOES NOT EXIST");
            } // an error occurred
            else {
                console.log(data);           // successful response
                resolve(data);
            }
        });
    })
}

exports.deleteBucket = async (bucketName) => {

    var params = {
        Bucket: bucketName
    };
    console.log(params)
    return new Promise((resolve, reject) => {
        s3.deleteBucket(params, function (err, data) {
            if (err) {
                resolve("BUCKET DOES NOT EXIST");
            } // an error occurred
            else {
                console.log("SUCCESS");           // successful response
                resolve(data);
            }
        });
    })

}