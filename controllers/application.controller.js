var applicationModel = require('../models/application.model');

// Create
exports.addApplication = async (req,res) => {
    try{
        console.log("Inside post");
        const application = new applicationModel(req.body);

        const savedApp = await application.save();
    
        console.log(req.body);
        res.status(201).json({ message: 'Application uploaded successfully', data: savedApp });
    }
    catch(error)
    {
        console.log(error);
    }
}

// Read All
exports.getAllApplications = async (req, res) => {
try {
    const apps = await applicationModel.find();
    res.json(apps);
} catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
}
}; 
  
// Read One
exports.getApplicationById = async (req, res) => {
try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ message: 'Application not found' });
    res.json(app);
} catch (error) {
    res.status(500).json({ message: 'Error fetching application', error: error.message });
}
};

// Update
exports.updateApplication = async (req, res) => {
try {
    const updatedApp = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedApp) return res.status(404).json({ message: 'Application not found' });
    res.json({ message: 'Application updated', data: updatedApp });
} catch (error) {
    res.status(500).json({ message: 'Error updating application', error: error.message });
}
};

// Delete
exports.deleteApplication = async (req, res) => {
try {
    const deletedApp = await Application.findByIdAndDelete(req.params.id);
    if (!deletedApp) return res.status(404).json({ message: 'Application not found' });
    res.json({ message: 'Application deleted' });
} catch (error) {
    res.status(500).json({ message: 'Error deleting application', error: error.message });
}
};

// Search
exports.searchApplications = async (req, res) => {
try {
    const { name, category, operatingSystem, binaryType } = req.query;
    const query = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (category) query.category = category;
    if (operatingSystem) query.operatingSystem = operatingSystem;
    if (binaryType) query.binaryType = binaryType;

    const results = await Application.find(query);
    res.json(results);
} catch (error) {
    res.status(500).json({ message: 'Error searching applications', error: error.message });
}
};

// Get SBOM
exports.getApplicationSBOM = async (req, res) => {
try {
    const app = await Application.findById(req.params.id).populate('sbom');
    if (!app) return res.status(404).json({ message: 'Application not found' });
    res.json(app.sbom);
} catch (error) {
    res.status(500).json({ message: 'Error fetching SBOM', error: error.message });
}
};

// Compare Applications
exports.compareApplications = async (req, res) => {
try {
    const { firstApplicationId, secondApplicationId } = req.body;
    const app1 = await Application.findById(firstApplicationId).populate('sbom');
    const app2 = await Application.findById(secondApplicationId).populate('sbom');

    if (!app1 || !app2) return res.status(404).json({ message: 'One or both applications not found' });

    res.json({ app1: app1.sbom, app2: app2.sbom });
} catch (error) {
    res.status(500).json({ message: 'Error comparing SBOMs', error: error.message });
}
};

// Stats (example by category)
exports.getApplicationStats = async (req, res) => {
try {
    const { groupBy } = req.query;
    if (!groupBy) return res.status(400).json({ message: 'Missing groupBy parameter' });

    const stats = await Application.aggregate([
    {
        $group: {
        _id: `$${groupBy}`,
        total: { $sum: 1 }
        }
    },
    { $sort: { total: -1 } }
    ]);

    res.json(stats);
} catch (error) {
    res.status(500).json({ message: 'Error generating stats', error: error.message });
}
};