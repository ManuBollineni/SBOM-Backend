var express = require('express');
var statRouter = express.Router();

var statController = require('../controllers/stats.controller');

statRouter.get('/applications', statController.getApplicationStats);
statRouter.get('/components/common', statController.getCommonComponentsStats);
statRouter.get('/components/vulnerabilities', statController.getVulnerabilityStats);

module.exports = statRouter;