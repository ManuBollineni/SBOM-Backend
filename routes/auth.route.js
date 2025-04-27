var express = require('express');
var authRouter = express.Router();

var authController = require('../controllers/auth.controller');

// Signup route
authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);

module.exports = authRouter;
