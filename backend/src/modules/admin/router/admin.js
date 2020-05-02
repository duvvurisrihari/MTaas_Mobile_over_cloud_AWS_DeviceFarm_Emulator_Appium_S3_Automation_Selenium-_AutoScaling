`use strict`

import express from 'express'
let router = express.Router()
import adminController from '../controller/admin'

router.post('/signup', adminController.createAdmin)
router.post('/login', adminController.loginAdmin)
router.get('/projects', adminController.getAllProjects)
router.get('/managers', adminController.getAllManagers)
router.get('/testers', adminController.getAllTesters)
router.post('/block/tester', adminController.blockTester)


module.exports = router
