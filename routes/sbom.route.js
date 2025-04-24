var express = require('express');
var sbomRouter = express.Router();

var sbomController = require('../controllers/sbom.controller');

sbomRouter.post('/addSboms', sbomController.addSBOM);
sbomRouter.get('/', sbomController.getAllSBOMs);
sbomRouter.get('/:id', sbomController.getSBOMById);
sbomRouter.put('/:id', sbomController.updateSBOM);
sbomRouter.delete('/:id', sbomController.deleteSBOM);

module.exports = sbomRouter;