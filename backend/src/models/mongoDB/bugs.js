`use strict`

import mongoose from 'mongoose'
require('mongoose-type-email');
 
const Bugs = new mongoose.Schema({
  name: {
		type: String,
		maxlength: 200,
    required: true,
    unique: true
  },
  subject: {
		type: String,
		required: true,
  },
  projectId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
	status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Reviewed', 'Closed'],
    default: 'Open',
		required: true
  },
  severity: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium',
		required: true
	},
	tester: {
		type: String,
		required: false,
	}
}, { versionKey: false })

export default mongoose.model('bugs', Bugs)
