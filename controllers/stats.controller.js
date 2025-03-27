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
    const stats = await Component.aggregate([
      {
        $group: {
          _id: '$name',
          totalUsage: { $sum: 1 }
        }
      },
      {
        $sort: { totalUsage: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error generating component statistics', error: error.message });
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
