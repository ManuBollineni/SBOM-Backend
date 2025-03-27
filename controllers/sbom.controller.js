// controllers/sbom.controller.js
const SBOM = require('../models/sbom.model');
const Application = require('../models/application.model');
const Component = require('../models/component.model');

// Create SBOM
exports.addSBOM = async (req, res) => {
  try {
    const { application, components } = req.body;
    const newSBOM = new SBOM({ application, components });
    const savedSBOM = await newSBOM.save();
    res.status(201).json({ message: 'SBOM created', data: savedSBOM });
  } catch (error) {
    res.status(500).json({ message: 'Error creating SBOM', error: error.message });
  }
};

// Get All SBOMs
exports.getAllSBOMs = async (req, res) => {
  try {
    const sboms = await SBOM.find().populate('application').populate('components');
    res.json(sboms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching SBOMs', error: error.message });
  }
};

// Get SBOM by ID
exports.getSBOMById = async (req, res) => {
  try {
    const sbom = await SBOM.findById(req.params.id).populate('application').populate('components');
    if (!sbom) return res.status(404).json({ message: 'SBOM not found' });
    res.json(sbom);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching SBOM', error: error.message });
  }
};

// Update SBOM
exports.updateSBOM = async (req, res) => {
  try {
    const updatedSBOM = await SBOM.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSBOM) return res.status(404).json({ message: 'SBOM not found' });
    res.json({ message: 'SBOM updated', data: updatedSBOM });
  } catch (error) {
    res.status(500).json({ message: 'Error updating SBOM', error: error.message });
  }
};

// Delete SBOM
exports.deleteSBOM = async (req, res) => {
  try {
    const deletedSBOM = await SBOM.findByIdAndDelete(req.params.id);
    if (!deletedSBOM) return res.status(404).json({ message: 'SBOM not found' });
    res.json({ message: 'SBOM deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting SBOM', error: error.message });
  }
};