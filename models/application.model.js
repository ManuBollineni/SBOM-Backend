const mongoose = require('mongoose');
const {Schema} = mongoose;

const applicationSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String },
    operatingSystem: { type: String, enum: ['iOS', 'Android', 'Mac OS', 'Windows OS', 'Linux OS'] },
    binaryType: { type: String, enum: ['mobile', 'desktop'] },
    supplier: { type: String },
    manufacturer: { type: String },
    // sbom: { type: mongoose.Schema.Types.ObjectId, ref: 'SBOM' },
    sbom: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Applications", applicationSchema);