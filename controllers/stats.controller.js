// controllers/stat.controller.js
const Application = require('../models/application.model');
const Component = require('../models/component.model');

// Get Stats by Category / OS / Supplier / Manufacturer
exports.getApplicationStats = async (req, res) => {
  try {
    const { groupBy } = req.query;
    if (!groupBy || !['category', 'operatingSystem', 'supplier', 'manufacturer'].includes(groupBy)) {
      return res.status(400).json({ message: 'Invalid or missing groupBy parameter' });
    }

    const stats = await Application.aggregate([
      {
        $group: {
          _id: `$${groupBy}`,
          totalApps: { $sum: 1 }
        }
      },
      {
        $sort: { totalApps: -1 }
      }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error generating statistics', error: error.message });
  }
};

// Get Most Common Components Across All Applications
exports.getCommonComponentsStats = async (req, res) => {
  try {
    // Fetch all components from MongoDB
    const components = await Component.find({});

    const licenseCounts = {};
    const supplierCounts = {};
    let vulnerableComponents = 0;
    let safeComponents = 0;

    // Loop through each component
    components.forEach(component => {
      // License Count
      const license = component.license || 'Unknown';
      licenseCounts[license] = (licenseCounts[license] || 0) + 1;

      // Supplier Count
      const supplier = component.supplier || 'Unknown';
      supplierCounts[supplier] = (supplierCounts[supplier] || 0) + 1;

      // Vulnerability Check
      if (component.isVulnerable === true || component.isVulnerable === 'true') {
        vulnerableComponents++;
      } else {
        safeComponents++;
      }
    });

    res.status(200).json({
      licenseCounts,
      supplierCounts,
      vulnerableComponents,
      safeComponents
    });

  } catch (error) {
    console.error('Error fetching component statistics:', error);
    res.status(500).json({ message: 'Failed to fetch component statistics.' });
  }
};

// Get Vulnerability Stats
exports.getVulnerabilityStats = async (req, res) => {
  try {
    const totalComponents = await Component.countDocuments();
    const vulnerableComponents = await Component.countDocuments({ isVulnerable: true });

    res.json({
      totalComponents,
      vulnerableComponents,
      percentageVulnerable: ((vulnerableComponents / totalComponents) * 100).toFixed(2) + '%'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating vulnerability stats', error: error.message });
  }
};
