const express = require('express');
const AuthController = require('../controllers/AuthController');
const UsersController = require('../controllers/UsersController');

const router = express.Router();

router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', UsersController.getMe);

module.exports = router;
