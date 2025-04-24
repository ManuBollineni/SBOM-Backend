var express = require('express');
var applicationRouter = express.Router();

var applicationController = require('../controllers/application.controller');


//All application Api operations
applicationRouter.post('/addApplication', applicationController.addApplication);
applicationRouter.get('/getAllApplication', applicationController.getAllApplications);
applicationRouter.post('/getByIdApplication', applicationController.getApplicationById);
applicationRouter.post('/updateApplication', applicationController.updateApplication);
applicationRouter.post('/deleteApplication', applicationController.deleteApplication);
applicationRouter.post('/searchApplication', applicationController.searchApplications);
applicationRouter.post('/getBySBOMApplication', applicationController.getApplicationSBOM);
applicationRouter.post('/compareApplication', applicationController.compareApplications);
applicationRouter.post('/getStatsApplication', applicationController.getApplicationStats);



module.exports = applicationRouter;