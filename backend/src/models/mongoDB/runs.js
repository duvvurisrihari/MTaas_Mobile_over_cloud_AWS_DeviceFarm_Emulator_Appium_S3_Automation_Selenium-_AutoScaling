`use strict`

import mongoose from 'mongoose'

const Runs = new mongoose.Schema({
    userId: {
		type: mongoose.Types.ObjectId,
		required: true,
    },
	userName: {
		type: String,
		maxlength: 50,
		required: true,
    },
    ARN: {
        type: String,
		required: true,
    },
}, { versionKey: false })

export default mongoose.model('runs', Runs)
