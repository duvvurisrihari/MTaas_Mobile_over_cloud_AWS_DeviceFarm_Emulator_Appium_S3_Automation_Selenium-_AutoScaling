`use strict`

import express from 'express'
let router = express.Router()
import deviceFarmController from '../controller/deviceFarm'
import upload from '../../../utils/upload'

router.post('/createdevicepool', deviceFarmController.createDevicePool)
router.get('/listDevicePools', deviceFarmController.listDevicePools)
router.get('/listUploads', deviceFarmController.listUploads)
router.get('/getRun', deviceFarmController.getRun)
router.get('/listRuns', deviceFarmController.listRuns)
router.get('/listJobs', deviceFarmController.listJobs)
router.get('/listSuites', deviceFarmController.listSuites)
router.get('/listTests', deviceFarmController.listTests)
router.get('/listArtifacts', deviceFarmController.listArtifacts)
router.delete('/deletepool', deviceFarmController.deleteDevicePool)
router.post('/schedulerun', upload.fields([{ name: 'file'} , { name: 'testFile'}]), deviceFarmController.scheduleRun)
router.delete('/stopRun', deviceFarmController.stopRun)
router.delete('/deleteRun', deviceFarmController.deleteRun)
router.get('/getDevicePool', deviceFarmController.getDevicePool)
router.get('/dashboardDetails', deviceFarmController.dashboardDetails)

module.exports = router
