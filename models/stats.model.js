const mongoose = require('mongoose');
const {Schema} = mongoose;

const statsSchema = new Schema({
    type: { type: String, enum: ['category', 'OS', 'supplier', 'manufacturer'], required: true },
    label: { type: String, required: true },
    totalApps: { type: Number },
    totalComponents: { type: Number },
    vulnerableCount: { type: Number },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Stat", statsSchema);