var express = require('express');
var componentRouter = express.Router();

var componentController = require('../controllers/component.controller');

componentRouter.post('/addComponent', componentController.addComponent);
componentRouter.post('/addMultipleComponent', componentController.addMultipleComponents);
componentRouter.post('/addComponentByName', componentController.addComponentByName);
componentRouter.get('/getAllComponents', componentController.getAllComponents);
componentRouter.get('/search', componentController.searchComponents);
componentRouter.get('/vulnerable', componentController.getVulnerableComponents);
componentRouter.get('/:id', componentController.getComponentById);
componentRouter.put('/:id', componentController.updateComponent);
componentRouter.delete('/deleteComponent/:id', componentController.deleteComponent);


module.exports = componentRouter;