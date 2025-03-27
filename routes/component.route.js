var express = require('express');
var componentRouter = express.Router();

var componentController = require('../controllers/component.controller');

componentRouter.post('/', componentController.addComponent);
componentRouter.get('/', componentController.getAllComponents);
componentRouter.get('/search', componentController.searchComponents);
componentRouter.get('/vulnerable', componentController.getVulnerableComponents);
componentRouter.get('/:id', componentController.getComponentById);
componentRouter.put('/:id', componentController.updateComponent);
componentRouter.delete('/:id', componentController.deleteComponent);


module.exports = componentRouter;