var componentModel = require('../models/component.model');
const axios = require('axios');



// Create Component
exports.addComponent = async (req, res) => {
try {
    console.log("add component", req.body);
    const newComponent = new componentModel(req.body);
    const savedComponent = await newComponent.save();
    res.status(201).json({ message: 'Component created', data: savedComponent });
} catch (error) {
    console.log("Error in adding component", error);
    res.status(500).json({ message: 'Error creating component', error: error.message });
}
};

// Create Multiple Components
exports.addMultipleComponents = async (req, res) => {
    try {
      const { components } = req.body;
      console.log();
  
      if (!Array.isArray(components) || components.length === 0) {
        return res.status(400).json({ message: 'components must be a non-empty array' });
      }
  
      console.log("Received components:", components);
  
      const savedComponents = await componentModel.insertMany(components);
  
      res.status(201).json({
        message: 'Components created successfully',
        data: savedComponents
      });
    } catch (error) {
      console.error("Error in adding multiple components:", error);
      res.status(500).json({
        message: 'Error creating components',
        error: error.message
      });
    }
  };

// Internal call to get components meta data by name.
exports.addComponentByName = async (req, res) => {
    try {
        console.log('component method', req)
        const { packagesList } = req.body;
    
        if (!Array.isArray(packagesList) || packagesList.length === 0) {
          return res.status(400).json({ message: 'packagesList is required and must be a non-empty array' });
        }

        // Fetch all metadata in parallel
        const enrichedPackages = await Promise.all(
          packagesList.map(pkg =>  getComponentMetaData(pkg.name, pkg.version))
        );
    
        // Filter out any failed/null entries
        const result = enrichedPackages.filter(pkg => pkg !== null);

        const savedComponents = await componentModel.insertMany(result);
  
        res.status(201).json({
            message: 'Components created successfully',
            data: savedComponents
        });
        console.log("Inside result", result );
    
      } catch (error) {
        console.error('Error in retrieving package metadata:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
      }
};

// Get All Components
exports.getAllComponents = async (req, res) => {
try {
    const components = await componentModel.find();
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
  
 const getComponentMetaData = async (name, version) => {
    try {

        if (name.startsWith('@')) {
            name =  name.split('/')[1]; // removes the scope
        }
        console.error(`Inside getComponentMetaData ${name}:`, name);

        const url = `https://registry.npmjs.org/${encodeURIComponent(name)}`;
        const response  = await axios.get(url);
        const data = response.data;

        const latest = data['dist-tags'].latest;
        const versionData = data.versions[latest];

        // name: '',
        // version: '',
        // license: '',
        // supplier: '',
        // isVulnerable: false,

        const pfgInfo = {
            name: data.name,
            version: versionData.version,
            license: data.license,
            supplier: '',
            isVulnerable: false
        }
        console.error(`My pfgInfo`, pfgInfo);
        return pfgInfo;

       
      } catch (error) {
        console.error(`Failed to fetch ${name}:`, error.message);
        return null;
      }
}