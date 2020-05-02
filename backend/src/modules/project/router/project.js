`use strict`

import express from 'express'
let router = express.Router()
import projectController from '../controller/project'
import upload from '../../../utils/upload'

router.get('/details/:projectId', projectController.getDetails)
router.get('/requested/:projectId', projectController.getRequestedUsers)
router.post('/acceptUser', projectController.acceptUser)
router.post('/rejectUser', projectController.rejectUser)
router.post('/announcement', projectController.announcement)
router.get('/devices/all', projectController.getAllDevices)
router.post('/uploadFile', upload.single('file'), projectController.uploadFile)
router.get('/filesInProject/:projectId/:userId', projectController.getFilesInProject)
router.delete('/details/:projectId', projectController.deleteProject)
router.get('/bill/:projectId', projectController.getUsage)

module.exports = router
