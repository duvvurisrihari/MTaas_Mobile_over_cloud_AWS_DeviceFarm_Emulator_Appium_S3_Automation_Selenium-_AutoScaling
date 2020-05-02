`use strict`

import mongoose from 'mongoose'

const emulatorRuns = new mongoose.Schema({
    projectId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    userName: {
        type: String,
        maxlength: 50,
        required: true,
    },
    platformName: {
        type: String,
        required: true
    },
    platformVersion: {
        type: String,
        required: true
    },
    deviceName: {
        type: String,
        required: true
    },
    app: {
        type: String,
        required: true
    },
    appPackage: {
        type: String,
        required: true
    },
    appActivity: {
        type: String,
        required: true
    },
    automationName: {
        type: String,
        required: true
    },
    runTime: {
        type: Number,
    }
}, { versionKey: false })

export default mongoose.model('emulatorRuns', emulatorRuns)
