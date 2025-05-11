const express = require('express');
const router = express.Router();
const hiveController = require('../controllers/hiveController');

// Create a new user or add a new member to an existing user
// Signup: userapi should be part of the route
router.post('/:userapi/signup', hiveController.signup);


// Member login
router.post('/login', hiveController.login);

// Token verification & member data
router.get('/:token/tokenverify', hiveController.tokenVerify);

// Admin update user details
router.put('/admin/:userapi/update', hiveController.updateUser);

// Admin view user data
router.get('/admin/:userapi/viewdata', hiveController.viewData);

module.exports = router;
