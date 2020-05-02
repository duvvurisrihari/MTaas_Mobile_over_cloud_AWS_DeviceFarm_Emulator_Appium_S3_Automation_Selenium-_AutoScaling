`use strict`

import express from 'express';
import userController from '../controller/users';

const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/profile/:userId', userController.getUserProfile);
router.put('/update', userController.updateUserProfile);

router.get('/project/all', userController.allProjects);
router.get('/project/accepted/:userId', userController.acceptedProjects);
router.get('/project/details/:userId/:projectId', userController.projectsDetails);
router.post('/project/join', userController.joinProject);

router.get('/announcements/all/:userId', userController.allAnnouncements);

module.exports = router;
