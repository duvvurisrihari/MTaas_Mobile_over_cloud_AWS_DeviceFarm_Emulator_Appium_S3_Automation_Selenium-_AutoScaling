`use strict`

import express from 'express'
let router = express.Router()
import bugsController from '../controller/bugs'

router.post('/createBug', bugsController.createBug)
router.get('/all/:userId', bugsController.getAllBugs)
router.get('/viewBug/:bugId', bugsController.getBug)
router.post('/updateBug/:bugId',bugsController.updateBug)
router.delete('/deleteBug',bugsController.deleteBug)
router.get('/allByProjectId/:projectId',bugsController.getBugsInProject)
//router.get('/getErrorReports',bugsController.getErrorReports)
router.get('/getBugStatsByProject/:projectId',bugsController.getBugStatsByProject)

module.exports = router
