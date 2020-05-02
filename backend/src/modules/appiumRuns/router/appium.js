`use strict`

import express from 'express'
let router = express.Router()
import appiumController from '../controller/appium'
import s3appium from '../controller/s3FileUpload'
import getRuns from '../controller/getRuns'
router.post('/createtest', appiumController.createTest);
router.post('/fileUpload', appiumController.fileUpload);
router.post('/getRuns', getRuns.getRuns)



module.exports = router
