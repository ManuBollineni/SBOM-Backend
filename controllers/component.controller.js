var componentModel = require('../models/component.model');


// Create Component
exports.addComponent = async (req, res) => {
try {
    const newComponent = new Component(req.body);
    const savedComponent = await newComponent.save();
    res.status(201).json({ message: 'Component created', data: savedComponent });
} catch (error) {
    res.status(500).json({ message: 'Error creating component', error: error.message });
}
};

// Get All Components
exports.getAllComponents = async (req, res) => {
try {
    const components = await Component.find();
    res.json(components);
} catch (error) {
    res.status(500).json({ message: 'Error fetching components', error: error.message });
}
};

// Get Component by ID
exports.getComponentById = async (req, res) => {
try {
    const component = await Component.findById(req.params.id);
    if (!component) return res.status(404).json({ message: 'Component not found' });
    res.json(component);
} catch (error) {
    res.status(500).json({ message: 'Error fetching component', error: error.message });
}
};

// Update Component
exports.updateComponent = async (req, res) => {
try {
    const updatedComponent = await Component.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedComponent) return res.status(404).json({ message: 'Component not found' });
    res.json({ message: 'Component updated', data: updatedComponent });
} catch (error) {
    res.status(500).json({ message: 'Error updating component', error: error.message });
}
};

// Delete Component
exports.deleteComponent = async (req, res) => {
try {
    const deletedComponent = await Component.findByIdAndDelete(req.params.id);
    if (!deletedComponent) return res.status(404).json({ message: 'Component not found' });
    res.json({ message: 'Component deleted' });
} catch (error) {
    res.status(500).json({ message: 'Error deleting component', error: error.message });
}
};

// Search Components (by name, version, supplier)
exports.searchComponents = async (req, res) => {
try {
    const { name, version, supplier, license } = req.query;
    const query = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (version) query.version = version;
    if (supplier) query.supplier = supplier;
    if (license) query.license = license;

    const results = await Component.find(query);
    res.json(results);
} catch (error) {
    res.status(500).json({ message: 'Error searching components', error: error.message });
}
};

// Get Vulnerable Components
exports.getVulnerableComponents = async (req, res) => {
try {
    const vulnerableComponents = await Component.find({ isVulnerable: true });
    res.json(vulnerableComponents);
} catch (error) {
    res.status(500).json({ message: 'Error fetching vulnerable components', error: error.message });
}
};
  